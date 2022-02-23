import { EventEmitter } from 'events';
import { Argument, TArgumentValues } from './Argument';
import { IBaseOption, Option } from './Option';
import { Help } from './Help';

enum ArgsFrom {
  User = 'User',
  Sys = 'Sys'
}

type TArgsFrom = keyof typeof ArgsFrom;

type TArgumentCallback<T> = (args?: T) => void;

export interface IBaseDefinition {
  readonly name: string;
  readonly description: string;
}

export abstract class BaseCommand implements IBaseDefinition {
  abstract readonly name: string;
  abstract readonly description: string;

  abstract parse(args: string[]): void;
  abstract option({
    name,
    description,
    required
  }: {
    name: string;
    description: string;
    required: boolean | undefined;
  }): Command;
  abstract argument({ name, description }: IBaseDefinition): Command;
}

/*
 * @class Command
 * */

export class Command extends EventEmitter implements BaseCommand {
  readonly name: string;
  readonly description: string;

  readonly _unknownOptions: Option[] = [];

  private _arguments: Argument[] = [];
  private _options: Option[] = [];
  private _from: TArgsFrom = ArgsFrom.Sys;
  private _executePath = '';

  private _rawArgs: string[];
  private _argsCallback: Record<string, TArgumentCallback<unknown>> = {};

  private _currentArgument: Argument;

  private _values: {
    option: string;
    value: string | boolean | undefined;
  }[] = [];

  /**/
  // 处理未知选项
  private _ignoreUnknownOption = false;
  /**/

  private _help: Help = new Help();

  constructor({ name, description }: { name: string; description: string }) {
    super();

    this.name = name;
    this.description = description;

    // 根据command本身，创建第一个argument参数
    this._currentArgument = new Argument({ name, description });
    this._arguments.push(this._currentArgument);
    this._addHelpArgument();
  }

  private _parseOptions(args: string[]) {
    this._rawArgs = args;

    let _i = 0; // 遍历指针
    let _option: Option; // 已经访问过的 Option
    let _argument: Argument = this._currentArgument;

    while (_i < args.length) {
      const _arg = args[_i];

      if (Option.maybeOption(_arg)) {
        if (_option) {
          this.emit(`option-${_argument?.name || this.name}-${_option.name}`, true);
        }
        _option = Command.findOption(_argument, _arg);
        if (!_option) {
          if (!this._ignoreUnknownOption) {
            throw Error(`Unknown option [${_arg}]`);
          } else {
            this._unknownOptions.push(
              new Option({
                name: _arg,
                description: 'Unknown option',
                belongTo: _argument.name ?? this.name,
                required: false
              })
            );
          }
        }
      } else {
        if (_option) {
          if (_argument) {
            this.emit(`option-${_argument.name}-${_option.name}`, _arg);
            _option = undefined;
          }
        } else {
          if (_i > 0) {
            _argument = this._findArgument(_arg);
          }
          if (!_argument) {
            throw Error(`Unknown argument <${_arg}>`);
          }
        }
      }
      _i += 1;
    }

    if (_option) {
      const belongTo = _argument ? _argument.name : this.name;
      this.emit(`option-${belongTo}-${_option.name}`, true);
    }
    if (_argument) this._invokeArgumentCallback(_argument.name);
  }

  /**
   *
   * @param arg
   * @param name
   *
   * @private
   */
  private static findOption(arg: Argument, name: string): Option | undefined {
    for (let i = 0; i < arg.options.length; i++) {
      if (arg.options[i].name === name) {
        return arg.options[i];
      }
    }

    return undefined;
  }

  /**
   *
   * @param name
   * @private
   */
  private _findArgument(name: string): Argument | undefined {
    for (let i = 0; i < this._arguments.length; i++) {
      if (this._arguments[i].name === name) {
        return this._arguments[i];
      }
    }

    return undefined;
  }

  /**
   *
   * @param argumentName
   * @private
   */
  private _getArgumentOptionValues(argumentName: string): TArgumentValues {
    const _value = {} as TArgumentValues;
    const _argument = this._findArgument(argumentName);

    if (!_argument) {
      return _value;
    }

    return _argument.values;
  }

  /**
   *
   * @param argumentName
   * @private
   */
  private _checkRequiredOptions(argumentName: string) {
    const _argument = this._findArgument(argumentName);

    if (!_argument) {
      return;
    }

    for (const opt of _argument.options) {
      if (opt.required && _argument.values[opt.strippedName()] === undefined) {
        throw Error(
          `Required option [${opt.name}] for command <${argumentName}> is missing`
        );
      }
    }
  }

  /**
   *
   * @private
   */
  private _invokeArgumentCallback(argumentName: string) {
    //
    this._checkRequiredOptions(argumentName);
    // 执行设置好的callback
    const callback = this._argsCallback[argumentName];
    if (callback && typeof callback === 'function') {
      callback.call(this, this._getArgumentOptionValues(argumentName));
    }
  }

  /**
   *
   * @private
   */
  private _addHelpArgument() {
    this.argument({
      name: 'help',
      description: '输出帮助信息'
    }).callback(() => {
      console.log(`  Usage: ${this.name} <commmand> [options]`);
      console.log(`  `);
      console.log(`  Commands`);

      for (const arg of this._arguments) {
        this._help.printHelp(arg, this._options);
      }
    });

    this._currentArgument = this._arguments[0];
  }

  /**
   * @param name
   * @param description
   *
   * @static
   */
  static command(name: string, description: string): Command {
    return new Command({
      name,
      description
    });
  }

  /**
   *
   * @param args
   *
   * @public
   */
  public parse(args?: string[]): void {
    //
    if (args) {
      this._from = ArgsFrom.User;
      args = args.slice(0);
    } else {
      args = process.argv.slice(2);
    }
    this._executePath = process.argv[0];
    this._values = [];
    this._parseOptions(args);
  }

  /**
   * @desc 添加option参数，可以通过链式调用添加
   * @param name
   * @param description
   * @param required
   * @param alias
   *
   * @public
   */
  public option({ name, description, required, alias }: IBaseOption): Command {
    if (!this._currentArgument) {
      // throw error ?
      return this;
    }

    const belong = this._currentArgument.name ?? this.name;

    const _option = this._currentArgument.option({
      name,
      alias,
      description,
      required: !!required
    });

    this.on(`option-${belong}-${name}`, (value: any) => {
      this._values[_option.strippedName()] = value;
      const _arg = this._findArgument(belong);

      _arg.setValue(_option.strippedName(), value);
      if (_option.alias) {
        _arg.setValue(alias, value);
      }
    });

    return this;
  }

  /**
   * @desc 添加回调参数，链式调用的终点
   * @example
   *
   * import { Command } from "@ntfs/argparser";
   *
   * const toolName = "xxx";
   * const toolDescription = "xxx is good"
   *
   * Command
   *  .command({
   *    name: toolName,
   *    description: toolDescription
   *  })
   *  .argument({ name: 'dev', description: 'development' });
   *
   * @params name
   * @params description
   *
   * @public
   */
  public argument({ name, description }: IBaseDefinition): Command {
    this._currentArgument = new Argument({
      name,
      description,
      belongTo: this._currentArgument?.name ?? this.name
    });
    this._arguments.push(this._currentArgument);
    this.on(`argument-${name}`, (args: any) => {
      console.log(args);
    });

    return this;
  }

  /**
   * @desc 添加回调参数，链式调用的终点
   * @example
   *
   * import { Command } from "@ntfs/argparser";
   *
   * const toolName = "xxx";
   * const toolDescription = "xxx is good"
   *
   * Command
   *  .command({
   *    name: toolName,
   *    description: toolDescription
   *  })
   *  .callback((args = {}) => {
   *    // do something
   *  });
   *
   * @param func
   *
   * @public
   */
  public callback<T extends unknown>(func: TArgumentCallback<T>): Command {
    const _callbackName = this._currentArgument?.name || this.name;

    if (this._argsCallback[_callbackName]) {
      console.log(
        `Callback for command <${_callbackName}> is already set，old value will be replaced; ${func.name}`
      );
    }

    this._argsCallback[_callbackName] = func;

    return this;
  }
}
