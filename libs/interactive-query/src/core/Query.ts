/**
 * 基础交互类；
 * 所有拓展类必须继承该类来获取必要的数据；
 */

import * as readline from 'readline';

export abstract class Query<TAnswer extends unknown> {
  protected _rl: readline.Interface;

  protected constructor({ prompt }: { prompt?: string }) {
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
      prompt
    });

    process.stdin.on('keypress', (input: string, key: readline.Key) => {
      this.onKeyPress(input, key);
    });
  }

  /**
   *
   * 执行程序
   *
   * @method execute
   * @return {Promise<string | [string, Error]>}
   *
   */
  abstract execute(): Promise<TAnswer>;

  /**
   * 监听键盘输入事件；
   * @method onKeyPress
   * @param  {string}       input 终端输入值；
   * @param  {readline.Key} key   终端激活的按键对象；
   *
   */
  abstract onKeyPress(input: string, key: readline.Key): void;
}
