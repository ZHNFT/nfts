import ts from 'typescript';
import fs from 'fs';
import { TypescriptConfigHost } from './TypescriptConfigHost';
import { dirname } from 'path';
import { TypescriptPluginOptions } from '../TypescriptPlugin';
import { BuildCommandLineParametersValue } from '../../cli/commands/BuildCommand';
import { BuildReCompileSubHook } from '../../hook/BuildHook';
import { TypescriptFileWriter } from './TyepscriptFileWriter';

export class TypescriptRunner {
  private readonly fileWriter: TypescriptFileWriter;
  private readonly parseConfigHost: TypescriptConfigHost;

  constructor() {
    this.parseConfigHost = new TypescriptConfigHost();
    this.fileWriter = new TypescriptFileWriter();
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

  private _emit(program: ts.Program, emitCallback: () => void) {
    //
  }

  public _runBuild(options: BuildCommandLineParametersValue) {
    const config = this._loadTsconfig(options.tsconfig);
    const host = ts.createCompilerHost(config.tsconfig.options, undefined);
    const program = ts.createProgram({
      rootNames: config.tsconfig.fileNames,
      host,
      options: undefined
    });

    program.emit(undefined, (fileName, data) => {
      const fileDirname = dirname(fileName);
      if (!fs.existsSync(dirname(fileName))) {
        fs.mkdirSync(fileDirname);
      }

      fs.writeFileSync(fileName, data);
    });
  }

  public _runIncrementalBuild(options: BuildCommandLineParametersValue) {
    const config = this._loadTsconfig(options.tsconfig);
    const host = ts.createIncrementalCompilerHost(config.tsconfig.options, undefined);
    const program = ts.createIncrementalProgram({
      rootNames: config.tsconfig.fileNames,
      host,
      options: config.tsconfig.options
    });

    program.emit(undefined, (fileName, data) => {
      const fileDirname = dirname(fileName);
      if (!fs.existsSync(dirname(fileName))) {
        fs.mkdirSync(fileDirname);
      }

      fs.writeFileSync(fileName, data);
    });
  }

  public async _runWatchBuild(
    options: TypescriptPluginOptions,
    recompile
  ): Promise<void> {
    await new Promise((_, reject) => {
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
