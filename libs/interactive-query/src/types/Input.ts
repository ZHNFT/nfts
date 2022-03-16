import { clearLine, Key, moveCursor } from 'readline';
import { Query } from '../core/Query';
import { Keys } from '../core/Keys';
import { Colors } from '../core/Colors';

export interface IInputConfig {
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
    this._rl.prompt();
    return new Promise<string>((resolve, reject) => {
      this._rl
        .on('close', () => {
          this._screen
            .upLine()
            .clearScreenDown()
            .hardWrite(`${this._config.summary}${Colors.cyan(this._input)}`, e => {
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
      this._rl.pause();
      this._rl.close();
    } else {
      this._input += input ?? '';
      this._screen.resetLineCursor(this._input.length).write(this._input);
    }
  }
}
