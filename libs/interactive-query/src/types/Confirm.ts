import { clearLine, clearScreenDown, Key, moveCursor } from 'readline';
import { Query } from '../core/Query';
import { Keys } from '../core/Keys';
import { Colors } from '../core/Colors';

export interface IConfirmConfig {
  summary: string;
}

export class Confirm extends Query<boolean> {
  private _config: IConfirmConfig;
  private _input = '';

  private static _summarySuffix = '[Y]es, [N]o ';

  constructor(config: IConfirmConfig) {
    super({ prompt: config.summary + Confirm._summarySuffix });
    this._config = config;
  }

  execute(): Promise<boolean> {
    this._rl.prompt();
    return new Promise<boolean>((resolve, reject) => {
      this._rl
        .on('close', () => {
          this._screen
            .upLine()
            .clearScreenDown()
            .hardWrite(
              `${this._config.summary}${
                this._isTruthyInput() ? Colors.cyan('Yes') : Colors.red('No')
              }`,
              e => {
                if (e) {
                  reject(e);
                } else {
                  resolve(this._isTruthyInput());
                }
              }
            );
        })
        .on('error', (e: Error) => {
          reject(e);
        });
    });
  }

  private _isTruthyInput = (): boolean => this._input.toLowerCase().startsWith('y');

  onKeyPress(input: string, key: Key): void {
    if (Keys.isEnterKey(key.sequence)) {
      this._rl.pause();
      this._rl.emit('close');
    } else {
      this._input += input ?? '';
      this._screen
        .moveCursorToLineStart(this._input.length)
        .clearScreenDown()
        .write(this._input);
    }
  }
}
