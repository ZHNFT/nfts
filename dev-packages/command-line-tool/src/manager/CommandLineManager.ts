/**
 *  Command Line Tool's main class.
 **/
import minimist from 'minimist';
import TerminalManager from './TerminalManger';

export default class CommandLineManager {
  private readonly _terminal!: TerminalManager;

  constructor() {
    //
    this._terminal = new TerminalManager();
  }

  get terminal(): TerminalManager {
    return this._terminal;
  }

  async parser<P>(): Promise<P> {
    const args = process.argv.slice(2);
    return minimist<P>(args);
  }
}
