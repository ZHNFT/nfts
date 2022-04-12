import ts from 'typescript';
import fs from 'fs';
import { TypescriptConfigHost } from './TypescriptConfigHost';
import { dirname } from 'path';

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

  private _resolveCompilerHost({
    config,
    options
  }: {
    config: ts.ParsedCommandLine;
    options: {
      watchMode: boolean;
    };
  }) {
    // if (options.watchMode) {
    // return ts.createWatchCompilerHost(config.options);
    // }

    return ts.createIncrementalCompilerHost(config.options);
  }

  private _resolveCompilerProgram() {}

  public async runBuild() {}

  public async runWatchBuild() {}
}
