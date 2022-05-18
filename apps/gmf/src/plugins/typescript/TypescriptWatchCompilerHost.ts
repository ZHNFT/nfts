import os from "os";
import ts from "typescript";
import { Terminal, chalk } from "@nfts/node-utils-library";
import { Debug } from "@nfts/noddy";

interface IWatchCompilerHost {
  configFileName: string;
  optionsToExtend: ts.CompilerOptions | undefined;
  system: ts.System;
  // createProgram?: ts.CreateProgram<T>;
  reportDiagnostic?: ts.DiagnosticReporter;
  reportWatchStatus?: ts.WatchStatusReporter;
  watchOptionsToExtend?: ts.WatchOptions;
  extraFileExtensions?: readonly ts.FileExtensionInfo[];
}

type TCustomWatchCompilerHostOpts = Omit<IWatchCompilerHost, "system">;

export class TypescriptWatchCompilerHost implements IWatchCompilerHost {
  configFileName: string;
  optionsToExtend: ts.CompilerOptions;
  system!: ts.System;
  watchOptionsToExtend?: ts.WatchOptions;
  extraFileExtensions?: readonly ts.FileExtensionInfo[];

  diagnosticsInOneTick: ts.Diagnostic[] = [];

  private readonly debug: Debug;

  constructor({
    debug,
    extraFileExtensions,
    configFileName,
    optionsToExtend,
    watchOptionsToExtend,
  }: { debug: Debug } & TCustomWatchCompilerHostOpts) {
    this.debug = debug;
    this.optionsToExtend = optionsToExtend!;
    this.watchOptionsToExtend = watchOptionsToExtend;
    this.configFileName = configFileName;
    this.extraFileExtensions = extraFileExtensions;
  }

  reportDiagnostic(diagnostic: ts.Diagnostic) {
    this.diagnosticsInOneTick.push(diagnostic);
  }

  reportWatchStatus(
    diagnostic: ts.Diagnostic,
    newLine: string,
    options: ts.CompilerOptions,
    errorCount?: number
  ) {
    if (!errorCount || errorCount === 0) {
      Terminal.clearScreen();
      this.diagnosticsInOneTick = [];
      console.log(diagnostic.messageText);
      return;
    }

    const diagnostics = TypescriptWatchCompilerHost.tsDiagnosticsPrettier(
      this.diagnosticsInOneTick
    );

    console.log(diagnostics);
  }

  public static tsDiagnosticsPrettier(
    diagnostics: ts.Diagnostic[],
    newLine: string = os.EOL
  ): string {
    const groupByFilename: Record<string, string[]> = {};
    const _ds = diagnostics.slice(0);
    for (let i = 0; i < _ds.length; i++) {
      const _d = _ds[i];

      const source = _d.file?.text;
      const filename = _d.file?.fileName;
      const pos = {
        start: _d.start ?? 0,
        end: (_d.start ?? 0) + (_d.length ?? 0),
      };

      const lines = source?.split(newLine) ?? [];

      let lineNo = 0;
      let prevCount = 0;
      let count = 0;

      while (count <= pos?.start) {
        prevCount = count;
        count += lines[lineNo].length + 1; // 每一行都要多算一个 \n 字符
        lineNo += 1;
      }

      if (pos.end > count) {
        // TODO 跨越多行的错误？
      }

      const lastLineNo = lineNo - 1;
      const errorLineNo = lineNo;

      const errorOffset = pos.start - prevCount;

      const tip = `${TypescriptWatchCompilerHost.arrayOf(
        " ",
        errorOffset + String(errorLineNo).length + 2 // 一个冒号一个空格
      )}${TypescriptWatchCompilerHost.arrayOf(
        chalk.red("~"),
        _d?.length ?? 0
      )}`;

      const outPut = [
        `      ${chalk.bgBlack(
          `${String(lastLineNo).padStart(String(errorLineNo).length, " ")}:`
        )} ${
          lines[lastLineNo - 1] // 行数下标是 1 开始，在数组中用需要减一
        }`,
        `      ${chalk.bgBlack(String(errorLineNo) + ":")} ${
          lines[lineNo - 1]
        }`,
        `      ${tip}${newLine}` +
          `      ${chalk.red(_d.messageText as string)}\n\r`,
      ];
      groupByFilename[filename!] = [
        ...(groupByFilename[filename!] ?? []),
        outPut.join(newLine),
      ];
    }

    let str = "";

    Object.keys(groupByFilename).forEach((filename) => {
      str += `→ ${chalk.yellow(filename)}${newLine}${groupByFilename[
        filename
      ].join(newLine)}`;
    });

    return str;
  }

  private static arrayOf(char: string, count: number) {
    return new Array(count).fill(char).join("");
  }

  public resolve(): ts.WatchCompilerHostOfConfigFile<ts.BuilderProgram> {
    return ts.createWatchCompilerHost(
      this.configFileName,
      undefined,
      this.system,
      undefined,
      (d) => this.reportDiagnostic(d),
      (...args) => this.reportWatchStatus(...args)
    );
  }
}
