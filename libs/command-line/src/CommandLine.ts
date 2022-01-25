import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { IBaseParameterInitOptions } from './base/BaseParameter';

export class CommandLine {
  static parser = new ArgumentsParser();

  toolName: string;
  toolDescription: string;

  private _callbackByName: Map<string, VoidFunction>;

  constructor({ toolName, toolDescription }: { toolName: string; toolDescription: string }) {
    this.toolName = toolName;
    this.toolDescription = toolDescription;

    this.defineParameter({
      longName: '--help',
      shortName: '-h',
      summary: '输出终端的工具信息',
      callback: () => {
        console.log(`${this.toolName} \n` + `    ${this.toolDescription}`);
      }
    });
  }

  /**
   * @public
   * @param longName
   * @param shortName
   * @param required
   * @param kind
   * @param callback
   * @param summary
   *
   * 向parser中定义参数
   */
  public defineParameter({
    longName,
    shortName,
    required,
    kind,
    callback,
    summary
  }: IBaseParameterInitOptions): void {
    CommandLine.parser.defineParam({
      longName,
      shortName,
      required,
      kind,
      summary
    });
    this._callbackByName.set(longName, callback);
    shortName && this._callbackByName.set(shortName, callback);
  }
}
