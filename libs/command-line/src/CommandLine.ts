import { Parser } from '@ntfs/node-arg-parser';
import { TParameterDefinition } from './base/BaseParameter';

export class CommandLine {
  private readonly toolName: string;
  private readonly toolDescription: string;
  private readonly _callbackByName: Map<string, VoidFunction>;

  public static parser: Parser = Parser.getParser();

  constructor({
    toolName,
    toolDescription
  }: {
    toolName: string;
    toolDescription: string;
  }) {
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
    callback,
    summary
  }: TParameterDefinition): void {
    CommandLine.parser.defineParam([
      {
        flagName: shortName,
        desc: summary,
        required
      }
    ]);
    this._callbackByName.set(longName, callback);
    shortName && this._callbackByName.set(shortName, callback);
  }
}
