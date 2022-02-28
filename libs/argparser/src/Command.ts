import { EventEmitter } from 'events';
import { Argument, TArgumentValues } from './Argument';
import { IOptionDefinition, Option } from './Option';
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

  /*
   * 解析命令行指令
   * */
  abstract parse(args: string[]): void;

  /*
   * 添加option；
   * 如果是跟在.argument()之后调用.option()，option会被添加到对应的argument上；
   * */
  abstract option({
    name,
    description,
    required
  }: {
    name: string;
    description: string;
    required: boolean | undefined;
  }): Command;

  /*
   * 添加argument；
   * */
  abstract argument(definition: IBaseDefinition): Command;
  /*
   * 添加argument的回调方法;
   * */
  abstract callback<T extends unknown>(fn: TArgumentCallback<T>): Command;
}

/**
 * @class Command
 */
export class Command extends EventEmitter implements BaseCommand {
  readonly name: string;
  readonly description: string;

  readonly _unknownOptions: Option[] = [];

  private _arguments: Argument[] = [];
  private _from: TArgsFrom = ArgsFrom.Sys;
  private _executePath = '';

  private _rawArgs: string[];
  private _argsCallback: Record<string, TArgumentCallback<unknown>> = {};

  private _currentArgument: Argument;

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
    this._currentArgument = new Argument({
      name,
      description
    });
    this._arguments.push(this._currentArgument);
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
          _argument.setValue(_option.strippedName(), true);
        }
        _option = _argument.getOption(_arg);
        if (!_option) {
          if (!this._ignoreUnknownOption) {
            throw Error(`Unknown option [${_arg}]`);
          } else {
            this._unknownOptions.push(
              new Option({
                name: _arg,
                description: 'Unknown option',
                belong: _argument.name ?? this.name,
                required: false
              })
            );
          }
        }
      } else {
        if (_option) {
          if (_argument) {
            _argument.setValue(_option.strippedName(), _arg);
            _option = undefined;
          }
        } else {
          _argument = this._findArgument(_arg);
          if (!_argument) {
            throw Error(`Unknown argument <${_arg}>`);
          }
        }
      }
      _i += 1;
    }

    if (_option) {
      _argument.setValue(_option.strippedName(), true);
    }

    this._invokeArgumentCallback(_argument.name);
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
   * @param definition
   *
   * @static
   */
  static command(definition: IBaseDefinition): Command {
    return new Command({
      name: definition.name,
      description: definition.description
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
    this._currentArgument = this._arguments[0];
    this._parseOptions(args);
  }

  /**
   * 添加option参数，可以通过链式调用添加
   *
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
   *  .option({
   *    name: '--name',
   *    description: 'specify name'
   *  });
   *
   * @param name
   * @param description
   * @param required
   * @param alias
   *
   * @public
   */
  public option({ name, description, required, alias }: IOptionDefinition): Command {
    if (!this._currentArgument) {
      // throw error ?
      return this;
    }

    this._currentArgument.option({
      name,
      alias,
      description,
      required: !!required
    });

    return this;
  }

  /**
   * 添加回调参数，链式调用的终点
   *
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
   *  .argument({
   *    name: 'dev',
   *    description: 'development'
   *  });
   *
   * @params name
   * @params description
   *
   * @public
   */
  public argument(definition: IBaseDefinition | Argument): Command {
    if (definition instanceof Argument) {
      this._currentArgument = definition;
      this._arguments.push(this._currentArgument);
    } else {
      this._currentArgument = new Argument({
        name: definition.name,
        description: definition.description,
        belong: this._currentArgument?.name ?? this.name
      });
      this._arguments.push(this._currentArgument);
    }

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
