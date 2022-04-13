import ts from 'typescript';
import fs from 'fs';
import { TypescriptConfigHost } from './TypescriptConfigHost';
import { dirname } from 'path';
import { TypescriptPluginOptions, EmitCallback } from '../TypescriptPlugin';
import { BuildCommandLineParametersValue } from '../../cli/commands/BuildCommand';

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

  private _emit(
    program: ts.Program | ts.EmitAndSemanticDiagnosticsBuilderProgram
  ): Promise<void[]> {
    const files: Promise<void>[] = [];
    program.emit(undefined, (filename, content) => {
      files.push(
        new Promise((resolve, reject) => {
          const fileDirname = dirname(filename);
          if (!fs.existsSync(fileDirname)) {
            fs.mkdirSync(fileDirname);
          }
          fs.writeFile(filename, content, e => {
            if (e) {
              reject(e);
            } else {
              resolve();
            }
          });
        })
      );
    });

    return Promise.all(files);
  }

  public _runBuild(
    options: BuildCommandLineParametersValue,
    onEmitCallback: EmitCallback
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
    onEmitCallback: EmitCallback
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
    onEmitCallback: EmitCallback
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
      program.emit();
    });
  }
}
