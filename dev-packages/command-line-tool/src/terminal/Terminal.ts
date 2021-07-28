import readline from 'readline';

/**
 * @example
 * const terminal = new TerminalManager();
 */
export default class TerminalManager {
  readonly _rl: readline.Interface;

  constructor(rl: readline.Interface) {
    this._rl = rl;
  }

  get rl(): readline.Interface {
    return this._rl;
  }

  /**
   *
   * @param msg
   * @example
   * /// 向控制台写入数据
   * TerminalManager.write('hello world');
   */
  write(msg: string): void {
    this.rl.write(msg);
  }
}
