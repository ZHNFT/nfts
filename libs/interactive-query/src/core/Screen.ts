import * as readline from 'readline';

export enum InlineClearType {
  Left = -1,
  Right = 1,
  Entire = 0
}

export interface IScreenSize extends readline.CursorPos {}

export class Screen {
  private readonly _rl: readline.Interface;
  private readonly _stdin: NodeJS.Process['stdin'];
  private readonly _stdout: NodeJS.Process['stdout'];

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

  public get screenSize(): IScreenSize {
    return {
      rows: this._stdout.rows,
      cols: this._stdout.columns
    };
  }

  nextLine(cb?: () => void): Screen {
    this.goToLine(1, cb);

    return this;
  }

  /**
   * @remark
   *  相对于光标当前的位置对光标进行上下移动，
   *  偏移数值如下所示；
   *  |--- -2
   *  |--- -1
   *  |---  0 <- 当前光标位置
   *  |---  1
   *  |---  2
   * @param lineOffset
   * @param cb
   */
  goToLine(lineOffset: number, cb?: () => void): Screen {
    readline.moveCursor(this._stdin, 0, lineOffset, cb);

    return this;
  }

  /**
   * @remark
   *  光标向上移动；
   */
  upLine(cb?: () => void): Screen {
    this.goToLine(-1, cb);

    return this;
  }

  /**
   * @remark
   *  光标在行内移动；
   * @param lineOffset
   */
  moveCursorInline(lineOffset: number): Screen {
    readline.moveCursor(this._stdin, lineOffset, 0);

    return this;
  }

  /**
   * @remark
   *  清楚光标所在行的数据；
   *  target
   *    -1：清除光标左侧；
   *     0：清除光标所在行的所有数据；
   *     1：清除右侧；
   * @param target
   */
  clearInline(target: InlineClearType): Screen {
    readline.clearLine(this._stdin, target);

    return this;
  }

  /**
   * @remark
   *  清屏
   */
  clearScreen(): void {
    //
  }

  /**
   * @remark
   *  清除光标下方所有数据，不包括光标所在行；
   */
  clearScreenDown(): Screen {
    const { cols } = this._rl.getCursorPos();
    readline.moveCursor(this._stdin, -cols, 0);
    readline.clearScreenDown(this._stdin);

    return this;
  }

  /**
   * @remark
   *  向 readline.Interface 写入数据
   * @param text
   */
  write(text: string): Screen {
    this._rl.write(text);

    return this;
  }

  /**
   * @remark
   *  向 stdin 写入数据
   * @param text
   * @param cb
   */
  hardWrite(text: string, cb?: (e?: Error) => void): Screen {
    this._stdin.write(text, cb);

    return this;
  }
}
