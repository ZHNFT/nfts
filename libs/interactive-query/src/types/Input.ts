import { Key } from 'readline';
import { Query } from '../core/Query';
import { Keys } from '../core/Keys';
import { Colors } from '../core/Colors';
import { InlineClearType } from '../core/Screen';

export interface IInputConfig {
  name: string;
  summary: string;
}

export class Input extends Query<string> {
  private _config: IInputConfig;
  private _input = '';

  constructor(config: IInputConfig) {
    super({ prompt: config.summary });
    this._config = config;
  }

  execute(): Promise<string> {
    this.rl.prompt();
    return new Promise<string>((resolve, reject) => {
      this.rl
        .on('close', () => {
          this.screen
            .upLine()
            .clearInline(InlineClearType.Right)
            .hardWrite(`${this._config.summary} ${Colors.cyan(this._input)}`, e => {
              if (e) {
                reject(e);
              } else {
                resolve(this._input);
              }
            });
        })
        .on('error', (e: Error) => {
          reject(e);
        });
    });
  }

  onKeyPress(input: string, key: Key): void {
    if (Keys.isEnterKey(key.sequence)) {
      this.rl.pause();
      this.rl.close();
    } else {
      this._input += input ?? '';
      this.screen.moveCursorInline(-this._input.length).clearInline(InlineClearType.Right).write(this._input);
    }
  }
}
