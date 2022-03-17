import { clearLine, Key, moveCursor } from 'readline';
import { Query } from '../core/Query';
import { Keys } from '../core/Keys';
import { Colors } from '../core/Colors';
import { Shapes } from '../core/Shapes';
import { InlineClearType } from '../core/Screen';

export interface ISelectConfig {
  name: string;
  summary: string;
  defaultValue?: string;
  multi?: boolean;
  alternatives: { name: string; description?: string }[];
}

export class Select extends Query<string> {
  private readonly _config: ISelectConfig;
  private _cursorIndex = 0;
  private _output = '';

  private _init = true;

  constructor(config: ISelectConfig) {
    super({ prompt: config.summary });
    if (
      typeof config.alternatives === 'undefined' ||
      !Array.isArray(config.alternatives)
    ) {
      throw Error('Expected `alternatives` to be an array');
    }
    this._config = config;
  }

  execute(): Promise<string> {
    this.rl.prompt();
    this.screen.nextLine(() => {
      this._generateOutput();
      this._writeOutput();
    });
    return new Promise<string>((resolve, reject) => {
      this.rl
        .on('close', () => {
          moveCursor(process.stdin, 0, -this._config.alternatives.length - 1);
          clearLine(process.stdin, 1);

          const item = this._config.alternatives[this._cursorIndex];

          this.screen
            .goToLine(0)
            .clearInline(InlineClearType.Right)
            .hardWrite(`${this._config.summary} ${Colors.cyan(item.name)}`, e => {
              if (e) {
                resolve(item.name);
              } else {
                reject(e);
              }
            });

          resolve(item.name);
        })
        .on('error', (e: Error) => {
          reject(e);
        });
    });
  }

  onKeyPress(_: string, key: Key): void {
    if (Keys.isDownKey(key.sequence)) {
      this._nextCursorIndex('add');
    }

    if (Keys.isUpKey(key.sequence)) {
      this._nextCursorIndex('minus');
    }

    if (Keys.isEnterKey(key.sequence)) {
      if (this._config.multi) {
        //
      } else {
        this.rl.pause();
        this.rl.close();
      }
    } else {
      this._generateOutput();
      this._writeOutput();
    }
  }

  private _nextCursorIndex(type: 'add' | 'minus') {
    this._cursorIndex =
      type == 'add'
        ? this._cursorIndex + 1
        : this._cursorIndex - 1 < 0
        ? this._config.alternatives.length - 1
        : this._cursorIndex - 1;
    this._cursorIndex = this._cursorIndex % this._config.alternatives.length;
  }

  private _generateOutput() {
    const { alternatives = [] } = this._config;
    const _cursorIndex = this._cursorIndex;

    const outputs = alternatives
      .map(alt => alt.name)
      .map((name, i) => {
        if (i === _cursorIndex) {
          return Colors.green(`${Shapes.arrowRight} ${name}`);
        }

        return `  ${name}`;
      });

    this._output = outputs.join('\r');
  }

  private _writeOutput() {
    const { cols } = this.rl.getCursorPos();

    if (this._init) {
      this.screen.moveCursorInline(-cols);
    } else {
      this.screen
        .goToLine(-(this._config.alternatives.length - 1))
        .moveCursorInline(-cols);
    }
    this.screen.clearScreenDown().write(this._output);
    this._init = false;
  }
}
