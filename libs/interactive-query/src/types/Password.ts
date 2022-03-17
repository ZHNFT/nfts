import { Key } from 'readline';
import { Query } from '../core/Query';
import { Keys } from '../core/Keys';
import { Colors } from '../core/Colors';
import { InlineClearType } from '../core/Screen';

export interface IPasswordConfig {
  name: string;
  summary: string;
  mask?: string; // 默认是*号；
  hidden?: boolean; // 是否展示密码输入；
}

export class Password extends Query<string> {
  private _config: IPasswordConfig;
  private _input = '';

  constructor({ summary, mask = '*', hidden = false, name }: IPasswordConfig) {
    super({ prompt: summary });
    this._config = {
      name,
      summary,
      mask,
      hidden
    };
  }

  execute(): Promise<string> {
    this.rl.prompt();
    return new Promise<string>((resolve, reject) => {
      this.rl
        .on('close', () => {
          this.screen
            .upLine()
            .clearScreenDown()
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
      this.screen
        .moveCursorInline(-this._input.length)
        .clearInline(InlineClearType.Right)
        .write(this._maskPassword());
    }
  }

  private _maskPassword(): string {
    if (!this._config.hidden) {
      return this._config.mask.repeat(this._input.length);
    }

    return '';
  }
}
