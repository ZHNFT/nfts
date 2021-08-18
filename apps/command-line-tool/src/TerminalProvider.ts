import * as readline from 'readline';
import { debuglog, DebugLogger } from 'util';

export default class TerminalProvider {
  readonly #_rl: readline.Interface;
  readonly #_debug: DebugLogger;

  constructor({ name }: { name: string }) {
    this.#_debug = debuglog(name);
    this.#_rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });
  }

  /**
   *
   * @param msg {string | object}
   * @public
   */
  log(msg: any) {
    this.#_debug(msg);
  }

  /**
   *
   * @param msg {string | object}
   * @public
   */
  write(msg: string) {
    this.#_rl.write(msg);
  }
}
