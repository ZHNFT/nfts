import Token from './Token';

export class Ast {
  txt: string;
  private index: number;
  private tokenValue: string;

  private tokens: Token[] = [];

  constructor(s: string) {
    this.txt = s;
  }

  /**
   * 解析
   */
  parse(): void {
    this.index = 0;
    this.tokenValue = '';

    while ((this.tokenValue = this._getChar())) {
      //
    }
  }

  private _getChar(): string {
    ++this.index;
    return this.tokenValue + this.txt[this.index];
  }

  /**
   * 长参数名校验正则
   * @type {RegExp}
   */
  static argLongNameRegex = /^--\w/;

  /**
   * 短参数名校验正则
   * @type {RegExp}
   */
  static argShortNameRegex = /^-\w/;
}
