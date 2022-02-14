import { createInterface, ReadLine } from 'readline';
import { stdin, stdout } from 'process';

export type TTerminalReader = (data: Buffer) => void;

export abstract class TerminalProvider {
  abstract _rl: ReadLine;
  abstract write(data: string | Buffer): void;
  // abstract read(reader: TTerminalReader): void;
}

export class Terminal implements TerminalProvider {
  readonly _rl: ReadLine;

  constructor() {
    this._rl = createInterface(stdin, stdout);
  }

  write(data: string | Buffer): void {
    this._rl.write(data);
  }
}
