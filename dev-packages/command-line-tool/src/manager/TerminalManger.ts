/**
 *  Terminal Manager's Main Class
 **/
import readline from 'readline';

export default class TerminalManager {
  private readonly _rl: readline.Interface;

  constructor() {
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  get rl(): readline.Interface {
    return this._rl;
  }

  /// clear terminal line
  clearLine(lineNumber: number) {}
  /// clear scrren
  clearScreen() {}
  /// write line
  writeLine(msg: string) {
    this._rl.write(msg);
  }
  /// write dynamic message in one line
  writeDynamicLine(msg: string) {}
}
