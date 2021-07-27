import readline from 'readline';

/**
 * @example
 * const terminal = new TerminalManager();
 */
export default class TerminalManager {
  readonly rl: readline.Interface;

  constructor(rl: readline.Interface) {
    this.rl = rl;
  }


  /**
   *
   * @param msg
   * @example
   * /// 向控制台写入数据
   * TerminalManager.write('hello world');
   */
  write(msg: string) {
    this.rl.write(msg);
  }
}
