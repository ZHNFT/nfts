import { EventEmitter } from 'events';
import { Argument } from './Argument';
import { Option } from './Option';
import * as process from 'process';
import * as console from 'console';

enum ArgsFrom {
  User = 'User',
  Sys = 'Sys'
}

type TArgsFrom = keyof typeof ArgsFrom;

interface IParseResultNode {
  optionByName: Record<string, string>;
  argument: string;
  next?: IParseResultNode;
}

type TArgumentCallback = (args?: any) => void;

type TOptionCallback = (value?: any) => void;

export type TBaseDefinition = {
  readonly name: string;
  readonly description: string;
};

export abstract class BaseCommand implements TBaseDefinition {
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
  abstract argument({ name, description }: TBaseDefinition): Command;
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
  private _argsCallback: Record<string, TArgumentCallback> = {};

  private _currentArgument: Argument;

  private _values: {
    option: string;
    value: string | boolean;
  }[] = [];

  /**/
  // 处理未知选项
  private _ignoreUnknownOption = false;
  /**/

  constructor({ name, description }: { name: string; description: string }) {
    super();

    this.name = name;
    this.description = description;
  }

  private _parseOptions(args: string[]) {
    this._rawArgs = args;

    let _i = 0; // 遍历指针
    let _option: Option; // 已经访问过的 Option
    let _argument: Argument = new Argument({
      name: this.name,
      description: this.description
    }); // 初始的 Argument

    while (_i < args.length) {
      const _arg = args[_i];

      if (Option.maybeOption(_arg)) {
        if (_option) {
          this.emit(`option-${_argument?.name || this.name}-${_option.name}`, true);
        }
        _option = this._findOption(_arg);
        if (!_option && !this._ignoreUnknownOption) {
          throw Error(`Unknown option [${_arg}]`);
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
   * @param name
   *
   * @private
   */
  private _findOption(name: string): Option | undefined {
    for (let i = 0; i < this._options.length; i++) {
      if (this._options[i].name === name) {
        return this._options[i];
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
   * @param name
   * @private
   */
  private _findOptionValue(name: string): string | boolean | undefined {
    return this._values.find(value => {
      return value.option === name;
    })?.value;
  }

  /**
   *
   * @param argumentName
   * @private
   */
  private _getArgumentOptionsValue(
    argumentName: string
  ): Record<string, string | boolean> {
    const _value = {};
    const _argument = this._findArgument(argumentName);

    if (!_argument) {
      return _value;
    }

    for (const option of _argument.collectDefinedOptions(this._options)) {
      _value[option.name] = this._findOptionValue(option.name);
    }

    return _value;
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

    for (const option of _argument.collectDefinedOptions(this._options)) {
      if (option.required && this._findOptionValue(option.name) === undefined) {
        throw Error(
          `Required option [${option.name}] for command <${argumentName}> is missing`
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
      callback.call(null, this._getArgumentOptionsValue(argumentName));
    }
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
   *
   * @public
   */
  public option({
    name,
    description,
    required
  }: TBaseDefinition & { required?: boolean }): Command {
    const belongTo = this._currentArgument?.name || this.name;

    if (this._findOption(name)?.belongTo === belongTo) {
      console.log(`Repeated setting option [${name}] for command <${belongTo}>\r`);
    }

    this._options.push(
      new Option({
        name,
        belongTo,
        description,
        required: !!required
      })
    );

    this.on(`option-${belongTo}-${name}`, (args: any) => {
      this._values.push({
        option: name,
        value: args as string | boolean
      });
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
  public argument({ name, description }: TBaseDefinition): Command {
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
  public callback(func: TArgumentCallback): Command {
    const _callbackName = this._currentArgument?.name || this.name;

    if (this._argsCallback[_callbackName]) {
      console.log(
        `Callback for command <${_callbackName}> is already set，old value will be replaced; ${func.name}`
      );
    }

    this._argsCallback[_callbackName] = func;

    return this;
  }

  /**
   * @desc 设置帮助信息，信息会在执行`command -h`后打印
   */
  public help(): string {
    //
    return '';
  }
}
