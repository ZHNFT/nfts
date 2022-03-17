/**
 * 基础交互类；
 * 所有拓展类必须继承该类来获取必要的数据；
 */
import * as readline from 'readline';
import * as process from 'process';
import { Screen } from './Screen';

export abstract class Query<TAnswer extends unknown> {
  public readonly rl: readline.Interface;
  public readonly screen: Screen;

  protected constructor({ prompt }: { prompt?: string }) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
      prompt: `${prompt} `,
      historySize: 0
    });

    this.screen = new Screen({
      stdin: process.stdin,
      stdout: process.stdout,
      rl: this.rl
    });

    const keypressHandler = (input: string, key: readline.Key) => {
      this.onKeyPress(input, key);
    };

    process.stdin.on('keypress', keypressHandler);
    this.rl.on('close', () => {
      process.stdin.off('keypress', keypressHandler);
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
   * @todo
   *  方向键在文字输入中的表现，现在在输入的时候如果按方向左右，文字会输出错误 ❌
   */
  abstract onKeyPress(input: string, key: readline.Key): void;
}
