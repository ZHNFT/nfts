import * as Events from 'events';
import { Action } from './Action';
import * as process from 'process';
import { Option } from './Option';

export type TCommandOptions = {
  allowUnknownOption: boolean;
  showHelpAfterError: boolean;
};

export enum ArgsFrom {
  User = 'User',
  Sys = 'Sys'
}

export class Command extends Events.EventEmitter {
  private readonly _version: string;
  private readonly _name: string;
  private _argsFrom: ArgsFrom;
  private _rawArgs: string[];

  private _actions: Action[];
  // 当前激活的操作
  private _action: Action | undefined;
  private _unknown: string[];
  private readonly _argOptions: any[];

  private _opts: TCommandOptions;

  constructor(name: string, version: string, opts: Partial<TCommandOptions> = {}) {
    super();

    this._name = name;
    this._version = version;
    this._actions = [];
    this._unknown = [];
    this._argOptions = [];
    this._opts = Object.assign(
      {},
      {
        allowUnknownOption: true,
        showHelpAfterError: true
      },
      opts
    );
  }

  public parse(args: string[] = []): Record<string, string | boolean> {
    if (args === undefined) {
      args = process.argv;
    } else {
      this._argsFrom = ArgsFrom.User;
    }

    this._parseOptions(args);

    const _res = Object.fromEntries(this._argOptions);
    this.emit(`action:${this._action.name}`, _res);

    return _res;
  }

  // 添加操作
  public addAction(action: { name: string; description: string }): Action {
    const _action = new Action(action);
    this._actions.push(_action);

    return _action.bindTo(this);
  }

  /** 判断是否是一个option */
  static maybeOptionName(name: string): boolean {
    return /^-{1,2}([a-z-]+)/.test(name);
  }

  private _parseOptions(args: string[]) {
    this._rawArgs = args.slice(0);
    if (this._argsFrom !== ArgsFrom.User) {
      args = args.slice(2);
    }

    let _peekedOption = args.shift();
    let pair: string[] = [];

    this._action = this._findAction(_peekedOption);

    // 第一个解析到的字段就是操作名称吗
    if (!this._action) {
      throw Error('需要至少提供一个指令');
    }

    while (_peekedOption) {
      _peekedOption = args.shift();
      // 参数标识。判断是否是合法参数？
      if (Command.maybeOptionName(_peekedOption)) {
        // 完成一对的检查，开始下一对
        if (pair.length === 2) {
          this._checkOption(pair[0]);
          this._argOptions.push(pair);
          this.emit(`option:${this._action.name}:${pair[0]}`, pair[1]);
          // 保存这一次的值
          pair = [_peekedOption];
        }
        //
        if (pair.length === 1) {
          this._checkOption(pair[0]);
          this._argOptions.push([...pair, true]);
          // 检查到了前一个也是参数，妻哪一个参数的值就设置成true
          this.emit(`option:${this._action.name}:${pair[0]}`, true);
          // 保存这一次的值
          pair = [_peekedOption];
        }

        const _parts = _peekedOption.split('=');

        // 针对等号形式的参数设置进行转换
        if (_parts.filter(Boolean).length < _parts.length) {
          throw Error(`错误的参数设置；${_peekedOption}`);
        } else {
          if (_parts.length === 2) {
            this._argOptions.push(_parts);
            this.emit(`option:${this._action.name}:${_parts[0]}`, _parts[1]);
          } else if (_parts.length === 1) {
            pair = [_peekedOption];
          }
        }
      } else {
        if (pair.length === 2) {
          this._checkOption(pair[0]);
          this._argOptions.push(pair);
          this.emit(`option:${this._action.name}:${pair[0]}`, pair[1]);
          pair = [];
          continue;
        }

        if (pair.length === 1) {
          pair.push(_peekedOption);
          continue;
        }

        this._unknown.push(_peekedOption);
      }
    }

    if (pair.length) {
      this._argOptions.push([pair[0], pair[1] ?? true]);
      this.emit(`option:${this._action.name}:${pair[0]}`, pair[1] ?? true);
    }
  }

  private _findAction(name: string): Action | undefined {
    return this._actions.find(action => action.name === name);
  }

  private _checkOption(optionName: string, optionValue?: string | boolean): void {
    const opt = this._findOption(optionName);
    if (!opt && !this._opts.allowUnknownOption) {
      throw Error(`未知的指令参数 ${optionName}`);
    }
  }

  private _findOption(name: string): Option | undefined {
    if (!this._action) return;
    const _opt = this._action._findOption(name);

    if (_opt?.name === name) {
      return _opt;
    }

    return;
  }
}
