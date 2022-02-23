import { Option } from './Option';
import { Argument } from './Argument';
import * as process from 'process';
import * as console from 'console';

export class Help {
  /* 留白边距 */
  private _margin = 8;

  /* WriteStream */
  private _stream = process.stdout;

  /* 输出终端的宽度 */
  private _width = process.stdout.columns;

  private static _formatHelp(arg: Argument): string {
    const _options = arg.options;
    const _msg = [arg.name, '  ', arg.description, '\r'];

    if (_options.length > 0) {
      for (let i = 0; i < _options.length; i++) {
        const _opt = _options[i];
        _msg.push([`${_opt.alias},${_opt.name}`, _opt.description, '\b\r'].join(' '));
      }
    }

    return _msg.join('');
  }

  static max(lens: number[]): number {
    return Math.max(...lens);
  }

  /* 考虑使用Terminal代替该方法 */
  static undeline = (msg: string): string => `\033[4m${msg}`;

  /* 输出绿色的块 */
  static greenBlock = (msg: string): string => `\033[42;30m ${msg} \033[40;32m`;

  /* 清空终端信息 */
  public clear(): void {
    this._stream.write(`\033[2J`);
  }

  public printHelp(arg: Argument, options: Option[]): void {
    console.log(Help._formatHelp(arg));
  }
}
