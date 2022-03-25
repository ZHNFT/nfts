import * as process from 'process';
import { IParserOptionDefinition, ParserOptionAbstract, TOption } from './Option';

export interface IParserConfigOptions {
  allowUnknownOptions?: boolean;
}

export interface IParserDefinition {
  name: string;
  description: string;
  opts?: IParserConfigOptions;
}

/*
 * todo
 *  -[ ] 支持从 rc 文件中获取命令参数
 * */
export class Parser {
  private readonly _name: string;
  private readonly _description: string;

  private _parsers: SubParser[];
  private readonly _parserOptions: ParserOptionAbstract[];
  private _executeFile: string;
  private _args: string[];

  private _unknownOptions: string[];
  private _opts: IParserConfigOptions;
  private _executeParser?: TParser;

  private static _getArgs(): string[] {
    return process.argv.slice(1);
  }

  private static _maybeOption = (arg: string): boolean =>
    arg.startsWith('-') || arg.startsWith('--');

  constructor({
    name,
    description,
    opts = {
      allowUnknownOptions: true
    }
  }: IParserDefinition) {
    this._name = name;
    this._description = description;
    this._opts = opts;
    this._parsers = [];
    this._parserOptions = [];
    this._unknownOptions = [];

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
  public addParser(parserDefinition: IParserDefinition | SubParser): TParser {
    const isSubParserInstance = parserDefinition instanceof SubParser;

    /*
     * 新添加的 parser 实例作为当前parser的子parser进行绑定；
     * addParser 返回 SubParser 的实例；
     */
    const parser: SubParser = isSubParserInstance
      ? parserDefinition
      : new SubParser(parserDefinition);

    parser.parent = this;

    this._parsers.push(parser);

    return parser;
  }

  public addOption(definition: IParserOptionDefinition): TOption {
    const optionInstance = ParserOptionAbstract.optionFactory(definition);
    this._parserOptions.push(optionInstance);
    return optionInstance;
  }

  public parse(args?: string[]): void {
    if (!args) {
      args = Parser._getArgs();
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

    // option 参数是被存储在对应的 parser 下，
    // 所以，如果想要实现最后的解析，
    // 任然需要找到对应的 parser 来执行 ._parse() 方法
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _actionParser: TParser = this;
    let _i = 0;
    let _action: string | undefined;

    while ((_action = actions[_i])) {
      _actionParser = _actionParser._findParser(_action);
      if (!_actionParser) {
        throw new Error(`Action <${_action}> in not define`);
      }
      _i++;
    }
    this._executeParser = _actionParser;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this._executeParser._parse(args, index);
  }

  private _parse(args?: string[], startIndex = 0): void {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
      const _optionDef = this.parser._executeParser._findOption(_name);
      if (_optionDef) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        _optionDef.strictSetValue(_value);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
    const _maybeValue = this.parser._args[index + 1];

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

  private _findParser(name: string): TParser {
    return this._parsers.find(_parser => _parser.name === name);
  }

  /**
   * 顶层的parser
   * */
  public get parser(): Parser {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _parser: TParser = this;

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

  get optionDefinitions(): ParserOptionAbstract[] {
    return this._parserOptions;
  }

  public options<T>(): Readonly<T & { _: string }> {
    const _obj = {} as T & { _: string };
    const inter = this.parser._executeParser._parserOptions;

    Object.defineProperty(_obj, '_', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: this.parser._executeParser.name
    });

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
  public parent: TParser;

  constructor(definition: IParserDefinition) {
    super(definition);
  }
}

export type TParser = Parser | SubParser;
