import ts from "typescript";
import fs from "fs";
import path from "path";
import { Fs, Execution, chalk } from "@nfts/node-utils-library";
import { Debug } from "@nfts/noddy";
import { dirname } from "path";
import { TypescriptConfigHost } from "./TypescriptConfigHost";
import { TypescriptWatchCompilerHost } from "./TypescriptWatchCompilerHost";
import Constants from "../../Constants";

export type VoidFunction = () => void;

export class TypescriptRunner {
  private readonly logger: Debug;
  private readonly parseConfigHost: TypescriptConfigHost;

  constructor({ debug }: { debug: Debug }) {
    this.logger = debug;
    this.parseConfigHost = new TypescriptConfigHost();
  }

  private _loadTsconfig(tsconfigPath: string): {
    tsconfig: ts.ParsedCommandLine;
  } {
    const configFile = ts.readConfigFile(tsconfigPath, (fileName) => {
      return fs.readFileSync(fileName).toString("utf-8");
    });

    const tsconfig = ts.parseJsonConfigFileContent(
      configFile.config,
      this.parseConfigHost,
      dirname(tsconfigPath),
      undefined,
      tsconfigPath
    );

    return {
      tsconfig,
    };
  }

  public async _runBuild(
    buildOptions: { tsconfig?: string; watch?: boolean },
    onEmitCallback?: VoidFunction
  ) {
    if (buildOptions.tsconfig) {
      const configStat = fs.statSync(buildOptions.tsconfig);
      if (configStat.isDirectory()) {
        buildOptions.tsconfig = path.resolve(
          buildOptions.tsconfig,
          Constants.TSCONFIG_PATH
        );
      } else {
        if (!configStat.isFile()) {
          throw new Error(
            `file/folder ${buildOptions.tsconfig} is not a valid tsconfig.json file,` +
              `or not a folder contains tsconfig.json`
          );
        }
      }
    } else {
      buildOptions.tsconfig = Constants.TSCONFIG_PATH;
    }

    const config = this._loadTsconfig(buildOptions.tsconfig);

    if (buildOptions.watch) {
      // Startup dev server
      await this._runWatchBuild(
        { tsconfigPath: buildOptions.tsconfig },
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
      options: tsconfig.options,
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
      debug: this.logger,
      configFileName: tsconfigPath,
      optionsToExtend: undefined,
      watchOptionsToExtend: undefined,
    });

    const watchProgram = ts.createWatchProgram(host.resolve());
    const program = watchProgram.getProgram();
    await this._emit(program).then(() => {
      onEmitCallback?.();
    });
    // await new Promise(() => {
    // });
  }
  /**
   * 写入编译好的代码到文件
   * @param program
   */
  private async _emit(
    program:
      | ts.Program
      | ts.EmitAndSemanticDiagnosticsBuilderProgram
      | ts.BuilderProgram
  ): Promise<void> {
    let files: { filename: string; content: string; depth: number }[] = [];

    async function _createWriteFileTask(
      filename: string,
      content: string
    ): Promise<void> {
      return await Fs.writeFile(filename, content);
    }

    program.getSyntacticDiagnostics;

    // All Diagnostics Messages
    const typescriptDiagnostics = [
      ...program.getConfigFileParsingDiagnostics(),
      ...program.getDeclarationDiagnostics(),
      ...program.getGlobalDiagnostics(),
      ...program.getOptionsDiagnostics(),
      ...program.getSemanticDiagnostics(),
      ...program.getSyntacticDiagnostics(),
    ];

    if (typescriptDiagnostics.length > 0) {
      const diagnosticsMessage =
        TypescriptWatchCompilerHost.tsDiagnosticsPrettier(
          typescriptDiagnostics
        );
      this.logger.log("\n" + diagnosticsMessage);
      this.logger.log(
        chalk.red(
          `Compile failed with ${typescriptDiagnostics.length} errors, ` +
            `Please fix the errors above, and try again!`
        )
      );
      process.exit(1);
    } else {
      program.emit(undefined, (filename, content) => {
        files.push({
          filename,
          content,
          depth: filename.split("/").length,
        });
      });

      files = files.sort((a, b) => (a.depth > b.depth ? 1 : -1));

      await Execution.serialize(
        files.map(
          (file) => () => _createWriteFileTask(file.filename, file.content)
        ),
        void 0
      );
    }
  }
}
