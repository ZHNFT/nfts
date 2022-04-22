import * as ts from 'typescript';
import { Screen } from '@nfts/node-utils-library';
import { DebugTool } from '@nfts/noddy';
import { Colors } from '@nfts/interactive-query';

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

type TCustomWatchCompilerHostOpts = Omit<IWatchCompilerHost, 'system'>;

export class TypescriptWatchCompilerHost implements IWatchCompilerHost {
  configFileName: string;
  optionsToExtend: ts.CompilerOptions;
  system: ts.System;
  watchOptionsToExtend?: ts.WatchOptions;
  extraFileExtensions?: readonly ts.FileExtensionInfo[];

  diagnosticsInOneTick: ts.Diagnostic[] = [];

  private readonly debug: DebugTool.Debug;

  constructor({
    debug,
    extraFileExtensions,
    configFileName,
    optionsToExtend,
    watchOptionsToExtend
  }: { debug: DebugTool.Debug } & TCustomWatchCompilerHostOpts) {
    this.debug = debug;
    this.optionsToExtend = optionsToExtend;
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
    errorCount: number
  ) {
    if (!errorCount || errorCount === 0) {
      Screen.cleanScreen();
      this.diagnosticsInOneTick = [];
      console.log(diagnostic.messageText);
      return;
    }

    this._formatRawDiagnostic();
  }

  private _formatRawDiagnostic() {
    const groupByFilename: Record<string, string[]> = {};

    const _ds = this.diagnosticsInOneTick.slice(0);

    for (let i = 0; i < _ds.length; i++) {
      const _d = _ds[i];

      const source = _d.file.text;
      const filename = _d.file.fileName;
      const pos = {
        start: _d.start - 1,
        end: _d.start - 1 + _d.length
      };

      const lines = source.split('\n');

      let lineNo = 0;
      let prevCount = 0;
      let count = 0;

      while (count < pos.start) {
        prevCount = count;
        count += lines[lineNo].length;
        lineNo++;
      }

      if (pos.end > count) {
        // TODO 跨越两行的错误？
      }

      const lastLineNo = lineNo - 1;
      const errorLineNo = lineNo;

      const errorOffset = pos.start - prevCount;

      const tip = `    ${new Array(errorOffset + String(lastLineNo).length + 1)
        .fill(null)
        .join(' ')}${TypescriptWatchCompilerHost.arrayOf(Colors.red('~'), _d.length)}`;

      const frame =
        `    ${lastLineNo}: ${lines[lastLineNo - 1]}\n` +
        `    ${errorLineNo}: ${lines[lineNo - 1]}\n` +
        tip;

      console.log(frame);
    }
  }

  private static arrayOf(char: string, count: number) {
    return new Array(count).fill(char).join('');
  }

  public resolve(): ts.WatchCompilerHostOfConfigFile<ts.BuilderProgram> {
    return ts.createWatchCompilerHost(
      this.configFileName,
      undefined,
      undefined,
      undefined,
      d => this.reportDiagnostic(d),
      (...args) => this.reportWatchStatus(...args)
    );
  }
}
