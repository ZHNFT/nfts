import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { Fs, Async } from '@nfts/node-utils-library';
import { DebugTool } from '@nfts/noddy';
import { dirname } from 'path';
import { BuildCommandLineParametersValue } from '../../cli/commands/BuildCommand';
import { TypescriptConfigHost } from './TypescriptConfigHost';
import Constants from '../../Constants';
import { TypescriptWatchCompilerHost } from './TypescriptWatchCompilerHost';

export class TypescriptRunner {
  private readonly debug: DebugTool.Debug;
  private readonly parseConfigHost: TypescriptConfigHost;

  constructor({ debug }: { debug: DebugTool.Debug }) {
    this.debug = debug;
    this.parseConfigHost = new TypescriptConfigHost();
  }

  private _loadTsconfig(tsconfigPath: string): {
    tsconfig: ts.ParsedCommandLine;
  } {
    const configFile = ts.readConfigFile(tsconfigPath, fileName => {
      return fs.readFileSync(fileName).toString('utf-8');
    });

    const tsconfig = ts.parseJsonConfigFileContent(
      configFile.config,
      this.parseConfigHost,
      dirname(tsconfigPath),
      undefined,
      tsconfigPath
    );

    return {
      tsconfig
    };
  }

  public async _runBuild(
    { commandLineParameters }: { commandLineParameters: BuildCommandLineParametersValue },
    onEmitCallback: VoidFunction
  ) {
    if (commandLineParameters.tsconfig) {
      const configStat = fs.statSync(commandLineParameters.tsconfig);
      if (configStat.isDirectory()) {
        commandLineParameters.tsconfig = path.resolve(
          commandLineParameters.tsconfig,
          Constants.TSCONFIG_PATH
        );
      } else {
        if (!configStat.isFile()) {
          throw new Error(
            `file/folder ${commandLineParameters.tsconfig} is not a valid tsconfig.json file,` +
              `or not a folder contains tsconfig.json`
          );
        }
      }
    } else {
      commandLineParameters.tsconfig = Constants.TSCONFIG_PATH;
    }

    const config = this._loadTsconfig(commandLineParameters.tsconfig);

    if (commandLineParameters.watch) {
      // Startup dev server
      await this._runWatchBuild(
        { tsconfigPath: commandLineParameters.tsconfig },
        onEmitCallback
      );
    } else {
      // Startup incremental-build process
      await this._runIncrementalBuild(config, onEmitCallback);
    }
  }
  /**
   * 增量构建，
   * @param param0
   * @param onEmitCallback
   */
  public async _runIncrementalBuild(
    { tsconfig }: { tsconfig: ts.ParsedCommandLine },
    onEmitCallback?: VoidFunction
  ): Promise<void> {
    const host = ts.createIncrementalCompilerHost(tsconfig.options, undefined);
    const program = ts.createIncrementalProgram({
      rootNames: tsconfig.fileNames,
      host,
      options: tsconfig.options
    });
    await this._emit(program).then(() => onEmitCallback?.());
  }

  /**
   * 创建 tsc 开发服务
   * @param param0
   * @param onEmitCallback
   */
  public async _runWatchBuild(
    { tsconfigPath }: { tsconfigPath: string },
    onEmitCallback?: VoidFunction
  ): Promise<void> {
    const host = new TypescriptWatchCompilerHost({
      debug: this.debug,
      configFileName: tsconfigPath,
      optionsToExtend: undefined,
      watchOptionsToExtend: undefined
    });

    const watchProgram = ts.createWatchProgram(host.resolve());
    const program = watchProgram.getProgram();
    await this._emit(program).then(() => {
      onEmitCallback();
    });
    await new Promise(() => {
      // Never resolved by self
    });
  }
  /**
   * 写入编译好的代码到文件
   * @param program
   */
  private async _emit(
    program: ts.Program | ts.EmitAndSemanticDiagnosticsBuilderProgram | ts.BuilderProgram
  ): Promise<void> {
    let files: { filename: string; content: string; depth: number }[] = [];

    async function _makeWrite(filename: string, content: string): Promise<void> {
      return await Fs.writeFile(filename, content);
    }

    program.emit(undefined, (filename, content) => {
      files.push({
        filename,
        content,
        depth: filename.split('/').length
      });
    });

    files = files.sort((a, b) => (a.depth > b.depth ? 1 : -1));

    await Async.serialize(
      files.map(file => () => _makeWrite(file.filename, file.content)),
      void 0
    );
  }
}
