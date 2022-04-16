import ts from 'typescript';
import fs from 'fs';
import { Fs, Async } from '@nfts/node-utils-library';
import { dirname } from 'path';
import { BuildCommandLineParametersValue } from '../../cli/commands/BuildCommand';
import { TypescriptPluginOptions } from '../TypescriptPlugin';
import { TypescriptConfigHost } from './TypescriptConfigHost';

export class TypescriptRunner {
  private readonly parseConfigHost: TypescriptConfigHost;

  constructor() {
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

  public _runBuild(
    options: BuildCommandLineParametersValue,
    onEmitCallback: VoidFunction
  ) {
    const config = this._loadTsconfig(options.tsconfig);
    const host = ts.createCompilerHost(config.tsconfig.options, undefined);
    const program = ts.createProgram({
      rootNames: config.tsconfig.fileNames,
      host,
      options: undefined
    });
    void this._emit(program).then(() => onEmitCallback());
  }

  public async _runIncrementalBuild(
    options: BuildCommandLineParametersValue,
    onEmitCallback: VoidFunction
  ): Promise<void> {
    const config = this._loadTsconfig(options.tsconfig);
    const host = ts.createIncrementalCompilerHost(config.tsconfig.options, undefined);
    const program = ts.createIncrementalProgram({
      rootNames: config.tsconfig.fileNames,
      host,
      options: config.tsconfig.options
    });
    await this._emit(program).then(() => onEmitCallback());
  }

  public async _runWatchBuild(
    options: TypescriptPluginOptions,
    onEmitCallback: VoidFunction
  ): Promise<void> {
    await new Promise(() => {
      const host = ts.createWatchCompilerHost(
        options.tsconfigPath,
        undefined,
        undefined,
        undefined,
        // report diagnostic
        diagnostic => {
          console.log(diagnostic.messageText);
        },
        // report watch diagnostic
        (diagnostic, newLine, _options, errorCount) => {
          if (!errorCount) {
            console.log(diagnostic.messageText);
            console.log(newLine);
          }
        }
      );
      const programWatch = ts.createWatchProgram(host);
      const program = programWatch.getProgram();
      void this._emit(program).then(() => onEmitCallback());
    });
  }
}
