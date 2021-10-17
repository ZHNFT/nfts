/**
 * @abstract CommandLineParser
 */

export interface ParserResult {
  _: string;
  [prop: string]: string | boolean;
}

export abstract class CommandLineParser {
  constructor(parameters: string[]) {}

  /**
   * @method parser
   *
   * 解析node的执行参数
   */
  public parser(): ParserResult {
    const result = {} as ParserResult;

    return result;
  }
}
