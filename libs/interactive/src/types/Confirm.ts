import { Key } from 'readline';
import { Query } from '../core/Query';
import { Keys } from '../core/Keys';
import { Colors } from '../core/Colors';
import { InlineClearType } from '../core/Screen';

export interface IConfirmConfig {
  name: string;
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

  private get _offset(): number {
    return this._input.length;
  }

  execute(): Promise<boolean> {
    this.rl.prompt();
    return new Promise<boolean>((resolve, reject) => {
      this.rl
        .on('close', () => {
          this.screen
            .upLine()
            .clearInline(1)
            .hardWrite(
              `${this._config.summary} ${this._isTruthyInput() ? Colors.cyan('Yes') : Colors.red('No')}`,
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
      this.rl.pause();
      this.rl.close();
    } else {
      this._input += input ?? '';
      this.screen.moveCursorInline(-this._offset).clearInline(InlineClearType.Right).write(this._input);
    }
  }
}
