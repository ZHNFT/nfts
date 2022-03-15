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
          moveCursor(process.stdin, 0, -1);
          clearScreenDown(process.stdin);
          process.stdout.write(
            `${this._config.summary}${
              this._input.toLowerCase().startsWith('y')
                ? Colors.cyan('Yes')
                : Colors.bold(Colors.red('No'))
            }`
          );
          resolve(this._input.toLowerCase().startsWith('y'));
        })
        .on('error', (e: Error) => {
          reject(e);
        });
    });
  }

  onKeyPress(input: string, key: Key): void {
    if (Keys.isEnterKey(key.sequence)) {
      this._rl.pause();
      this._rl.emit('close');
    } else {
      this._input += input ?? '';
      moveCursor(process.stdin, -this._input.length, 0);
      clearLine(process.stdin, 1);
      this._rl.write(this._input);
    }
  }
}
