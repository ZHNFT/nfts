import * as process from 'process';

export interface IParserDefinition {
  name: string;
  description: string;
}

export enum OptionTypes {
  Flag = 'Flag', // true/false
  Int = 'Int', // integer
  Float = 'Float', // float
  String = 'String', // String
  Choices = 'Choices', //
  Array = 'Array' // 可以声明多个option，来完成一个数组的交互，数组成员统一转换成字符串；
}

export type TOptionTypes = keyof typeof OptionTypes;

export interface IParserOptionDefinition {
  name: string;
  type: TOptionTypes;
  /*
   * 可以设置option的别名，一个或者多个；
   * 通常别名只有一个字母：-x
   * */
  alias?: string | string[];
  usage?: string;
  /*
   * 在type=Choices的情况下的待选项；
   * */
  alternatives?: string[];
  required?: boolean;
}

export class Parser {
  private readonly _command: string;
  private readonly _commandDescription: string;

  private _parser: Parser;

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

  constructor({ name, description }: IParserDefinition) {
    this._command = name;
    this._commandDescription = description;
    this._parser = this;
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
    let parser: SubParser =
      parserDefinition instanceof SubParser
        ? parserDefinition
        : new SubParser(parserDefinition);
    parser.parent = this._parser;
    this._parsers.push(parser);
    this._parser = parser;

    return this._parser;
  }

  public addOption(definition: IParserOptionDefinition): Parser | SubParser {
    this._parserOptions.push(optionFactory(definition));
    return this._parser;
  }

  public parse(args?: string[]): void {
    if (!args) {
      args = Parser._getArgs();
      args = args.slice(1);
    }
    this._args = args;
    this._executeFile = args[0];
    this._executeParser = this._findParser(args[0]);
    if (!this._executeParser) {
      throw new Error(`No parser found for \`${args[0]}\``);
    }
    this._executeParser._parse(args);
  }

  private _parse(args?: string[]): void {
    let index = 0;

    while (index < args.length) {
      const arg = args[index];

      if (arg.startsWith('--') || arg.startsWith('-')) {
        /*
         * 处理等式参数的情况；--abc=abc
         * */
        const parts = arg.split('=');
        if (parts.length > 1) {
          this._parserOptionValueByName.set(parts[0], parts[1]);
        } else {
          const [_index, _value] = this._optionValue(index);
          this._parserOptionValueByName.set(arg, _value);
          index = _index;
        }
      }

      index++;
    }
  }

  private _optionValue(index: number): [number, string | boolean] {
    const _maybeValue = this._args[index + 1];

    if (!_maybeValue) {
      return [index, true];
    }

    if (_maybeValue.startsWith('--') || _maybeValue.startsWith('-')) {
      return [index, true];
    }

    return [(index += 1), _maybeValue];
  }

  private _findOption(name: string): ParserOption | undefined {
    return this._parserOptions.find(_opt => _opt.name === name);
  }

  private _findParser(name: string): Parser | SubParser {
    return this._parsers.find(_parser => _parser.command === name);
  }

  get command(): string {
    return this._command;
  }

  get commandDescription(): string {
    return this._commandDescription;
  }

  public options() {}
}

class SubParser extends Parser {
  public parent: Parser | SubParser;

  constructor(definition: IParserDefinition) {
    super(definition);
  }

  public getParent(): Parser | SubParser {
    return this.parent;
  }
}

export abstract class ParserOption implements IParserOptionDefinition {
  readonly name: string;
  readonly type: TOptionTypes;
  /*
   * 可以设置option的别名，一个或者多个；
   * 通常别名只有一个字母：-x
   * */
  readonly alias?: string | string[];
  readonly usage?: string;
  /*
   * 在type=Choices的情况下的待选项；
   * */
  readonly alternatives?: string[];

  readonly required?: boolean;

  constructor(definition: IParserOptionDefinition) {
    this.name = definition.name;
    this.usage = definition.usage;
    this.alias = definition.alias;
    this.alternatives = definition.alternatives;
    this.type = definition.type;
    this.required = definition.required;
  }

  /*
   * 校验value值是否符合定义
   * */
  abstract validate(value: unknown): void;
}

class StringOption extends ParserOption {
  readonly type = OptionTypes.String;
  public validate(value): void {
    if (typeof value !== 'string') {
      throw new TypeError('Type error');
    }
  }
}

class FlagOption extends ParserOption {
  validate(): void {
    //
  }
}

class IntOption extends ParserOption {
  validate(): void {
    //
  }
}

class FloatOption extends ParserOption {
  validate(): void {
    //
  }
}

class ChoicesOption extends ParserOption {
  validate(): void {
    //
  }
}

class ArrayOption extends ParserOption {
  validate(): void {
    //
  }
}

export function optionFactory(option: IParserOptionDefinition): ParserOption {
  switch (option.type) {
    case OptionTypes.Array:
      return new ArrayOption(option);
    case OptionTypes.Choices:
      return new ChoicesOption(option);
    case OptionTypes.Flag:
      return new FlagOption(option);
    case OptionTypes.Float:
      return new FloatOption(option);
    case OptionTypes.Int:
      return new IntOption(option);
    case OptionTypes.String:
      return new StringOption(option);
    default:
      throw new Error('');
  }
}
