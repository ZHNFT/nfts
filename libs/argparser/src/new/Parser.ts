import * as process from 'process';
import {
  IParserDefinition,
  IParserOptionDefinition,
  ParserOption,
  optionFactory
} from './Option';

/**
 * todo
 *  -[ ] 支持从 rc 文件中获取命令参数
 * */

export class Parser {
  private readonly _name: string;
  private readonly _description: string;

  private _lastParser: Parser;
  private _executeParser: Parser | SubParser;
  private _parsers: SubParser[];
  private _parserOptions: ParserOption[];
  private _executeFile: string;
  private _args: string[];
  private _parserOptionValueByName: Map<
    string,
    string | boolean | number | Array<string>
  >;

  private static _getArgs(): string[] {
    return process.argv.slice(1);
  }

  private static _maybeOption = (arg: string): boolean =>
    arg.startsWith('-') || arg.startsWith('--');

  constructor({ name, description }: IParserDefinition) {
    this._name = name;
    this._description = description;
    this._lastParser = this;
    this._parsers = [];
    this._parserOptions = [];
    this._parserOptionValueByName = new Map();
  }

  /**
   * 添加子解析器
   *
   * @param parserDefinition
   * @public
   */
  public addParser(parserDefinition: IParserDefinition | SubParser): Parser | SubParser {
    /**
     * 支持传入SubParser实例，也支持传入定义；
     * */
    if (parserDefinition instanceof Parser) {
      throw new Error('.addParser() can only add SubParser instance!');
    }

    let parser: SubParser =
      parserDefinition instanceof SubParser
        ? parserDefinition
        : new SubParser(parserDefinition);

    // chain-up
    parser.parent = this._lastParser;
    this._parsers.push(parser);
    this._lastParser = parser;

    return this._lastParser;
  }

  public addOption(definition: IParserOptionDefinition): Parser | SubParser {
    this._parserOptions.push(optionFactory(definition));
    return this._lastParser;
  }

  public parse(args?: string[]): void {
    if (!args) {
      args = Parser._getArgs();
      args = args.slice(1);
    }
    this._args = args;
    this._executeFile = args[0];

    const actions: string[] = [];

    let index = 0;

    for (const arg of args) {
      if (!Parser._maybeOption(arg)) {
        actions.push(arg);
        index++;
      } else {
        break;
      }
    }

    this._executeParser = this._parser;

    for (const action of actions) {
      this._executeParser = this._executeParser._findParser(action);
      if (!this._executeParser) {
        throw new Error(`No parser found for ${action}`);
      }
    }

    this._parser._parse(args, index);
  }

  private _parse(args?: string[], startIndex: number = 0): void {
    while (startIndex < args.length) {
      const arg = args[startIndex];

      if (Parser._maybeOption(arg)) {
        /*
         * 处理等式参数的情况；--abc=abc
         * */
        const parts = arg.split('=');
        if (parts.length > 1) {
          this._parserOptionValueByName.set(parts[0], parts[1]);
        } else {
          const [_index, _value] = this._optionValue(startIndex);
          this._parserOptionValueByName.set(arg, _value);
          startIndex = _index;
        }
      }

      startIndex++;
    }

    /**
     * todo
     *  -[ ] 参数校验；参数校验需要获取道当前执行的 parser 来进行校验
     * */
  }

  private _optionValue(index: number): [number, string | boolean] {
    const _maybeValue = this._args[index + 1];

    if (!_maybeValue) {
      return [index, true];
    }

    if (Parser._maybeOption(_maybeValue)) {
      return [index, true];
    }

    return [index + 1, _maybeValue];
  }

  private _findOption(name: string): ParserOption | undefined {
    return this._parserOptions.find(_opt => _opt.name === name);
  }

  private _findParser(name: string): Parser | SubParser {
    return this._parsers.find(_parser => _parser.name === name);
  }

  private get _parser(): Parser {
    let _parser = this._lastParser;

    while (_parser instanceof SubParser) {
      _parser = _parser.parent;
    }

    return _parser;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  public options<T>(): Readonly<T> {
    const _obj = {} as T;
    const inter = this._parserOptionValueByName.entries();

    for (const [optionName, value] of inter) {
      Object.defineProperty(_obj, optionName, {
        value,
        writable: false,
        enumerable: true,
        configurable: false
      });
    }

    return _obj;
  }
}

export class SubParser extends Parser {
  public parent: Parser | SubParser;

  constructor(definition: IParserDefinition) {
    super(definition);
  }
}
