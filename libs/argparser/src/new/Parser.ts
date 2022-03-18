import * as process from 'process';
import { IParserOptionDefinition, ParserOptionAbstract } from './Option';

export interface IParserConfigOptions {
  allowUnknownOptions?: boolean;
}

export interface IParserDefinition {
  name: string;
  description: string;

  opts?: IParserConfigOptions;
}

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
  private _parserOptions: ParserOptionAbstract[];
  private _executeFile: string;
  private _args: string[];
  private _parserOptionValueByName: Map<
    string,
    string | boolean | number | Array<string>
  >;

  private _unknownOptions: string[];
  private _opts: IParserConfigOptions;

  private static _getArgs(): string[] {
    return process.argv.slice(1);
  }

  private static _maybeOption = (arg: string): boolean =>
    arg.startsWith('-') || arg.startsWith('--');

  constructor({ name, description, opts = {} }: IParserDefinition) {
    this._name = name;
    this._description = description;
    this._opts = opts;
    this._lastParser = this;
    this._parsers = [];
    this._parserOptions = [];
    this._parserOptionValueByName = new Map();

    if (this.parser) {
      return this.parser;
    }
  }

  /**
   * 添加子解析器
   *
   * @param parserDefinition
   * @public
   */
  public addParser(parserDefinition: IParserDefinition | SubParser): Parser | SubParser {
    const isSubParserInstance = parserDefinition instanceof SubParser;

    const parser: SubParser = isSubParserInstance
      ? parserDefinition
      : new SubParser(parserDefinition);

    // chain-up
    parser.parent = this._lastParser;
    this._parsers.push(parser);

    if (isSubParserInstance) {
      this._lastParser = this;
    } else {
      this._lastParser = parser;
    }

    return this._lastParser;
  }

  public addOption(definition: IParserOptionDefinition): Parser | SubParser {
    this._parserOptions.push(ParserOptionAbstract.optionFactory(definition));
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

    this._executeParser = this.parser;

    for (const action of actions) {
      this._executeParser = this._executeParser._findParser(action);
      if (!this._executeParser) {
        throw new Error(`No parser found for ${action}`);
      }
    }

    this.parser._parse(args, index);
  }

  private _parse(args?: string[], startIndex = 0): void {
    const _executeParser = this._executeParser;
    const _optionsWithValue: [string, string | number | boolean | undefined][] = [];

    /**
     * 收集参数
     * */
    while (startIndex < args.length) {
      const arg = args[startIndex];
      if (Parser._maybeOption(arg)) {
        const parts = arg.split('=');
        if (parts.length > 1) {
          const [_option, _value] = parts;
          _optionsWithValue.push([_option, _value]);
        } else {
          const [_index, _value] = this._optionValue(startIndex);
          _optionsWithValue.push([arg, _value]);
          startIndex = _index;
        }
      }
      startIndex++;
    }

    /**
     * 统一校验
     * */
    for (const optionsWithValueElem of _optionsWithValue) {
      const [_name, _value] = optionsWithValueElem;
      const _optionDef = _executeParser._findOption(_name);
      if (_optionDef) {
        _optionDef.strictSetValue(_value);
        _optionDef?.callback?.(_value);
      } else {
        if (this._opts?.allowUnknownOptions) {
          this._unknownOptions.push(_name);
        } else {
          throw new Error(`Unknown option <${_name}>`);
        }
      }
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

  private _findOption(name: string): ParserOptionAbstract | undefined {
    return this._parserOptions.find(_opt => _opt.name === name);
  }

  private _findParser(name: string): Parser | SubParser {
    return this._parsers.find(_parser => _parser.name === name);
  }

  /**
   * 顶层的parser
   * */
  public get parser(): Parser {
    let _parser = this._lastParser;

    while (_parser instanceof SubParser) {
      _parser = _parser.parent;
    }

    return _parser;
  }

  get executedParser(): SubParser | Parser | undefined {
    return this._executeParser;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  public options<T>(): Readonly<T> {
    const _obj = {} as T;
    const inter = this._executeParser._parserOptions;

    for (const { value, strippedName } of inter) {
      Object.defineProperty(_obj, strippedName, {
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
