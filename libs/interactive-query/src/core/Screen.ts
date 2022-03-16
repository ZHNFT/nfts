import * as readline from 'readline';

export class Screen {
  private _rl: readline.Interface;
  private _stdin: NodeJS.Process['stdin'];
  private _stdout: NodeJS.Process['stdout'];

  constructor({
    stdin = process.stdin,
    stdout = process.stdout,
    rl
  }: {
    stdin?: NodeJS.Process['stdin'];
    stdout?: NodeJS.Process['stdout'];
    rl: readline.Interface;
  }) {
    this._stdin = stdin;
    this._stdout = stdout;
    this._rl = rl;
  }

  nextLine(): Screen {
    this.moveCursorToLineStart(1);

    return this;
  }

  upLine(): Screen {
    this.moveCursorToLineStart(-1);

    return this;
  }

  moveCursorToLineStart(lineOffset: number): Screen {
    const prompt = this._rl.getPrompt();
    readline.moveCursor(this._stdin, -(prompt.length - lineOffset), 0);

    return this;
  }

  clearScreen(): void {
    //
  }

  resetLineCursor(lineOffset: number): Screen {
    readline.moveCursor(this._stdin, -lineOffset, 0);
    readline.clearLine(this._stdin, 1);
    return this;
  }

  clearScreenDown(): Screen {
    const { cols } = this._rl.getCursorPos();
    readline.moveCursor(this._stdin, -cols, 0);
    readline.clearScreenDown(this._stdin);

    return this;
  }

  write(text: string): Screen {
    this._rl.write(text);

    return this;
  }

  hardWrite(text: string, cb?: (e?: Error) => void): Screen {
    this._stdin.write(text, cb);

    return this;
  }
}
