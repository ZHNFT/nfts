import { StdIn } from './Stdin';
import { StdOut } from './Stdout';

export class Terminal {
  _stdin: StdIn;
  _stdout: StdOut;

  constructor() {
    this._stdin = new StdIn();
    this._stdout = new StdOut();
  }
}
