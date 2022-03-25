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
  /*
   * 可以设置option的别名，一个或者多个；
   * 通常别名只有一个字母：-x
   * */
  alias?: string | string[];
  usage?: string;
  type: TOptionTypes;
  /*
   * 在type=Choices的情况下的待选项；
   * */
  alternatives?: string[];
  required?: boolean;
  callback?: (result?: any) => void;
  value?: unknown;
}

export abstract class ParserOptionAbstract implements IParserOptionDefinition {
  readonly name: string;
  /*
   * 可以设置option的别名，一个或者多个；
   * 通常别名只有一个字母：-x
   * */
  readonly alias?: string | string[];
  readonly usage?: string;
  readonly type: TOptionTypes;
  /*
   * 在type=Choices的情况下的待选项；
   * */
  readonly alternatives?: string[];
  /*
   * Is required field?
   * */
  readonly required?: boolean;

  private _value?: unknown;

  readonly callback?: (result: unknown) => void;

  protected constructor(definition: IParserOptionDefinition) {
    this.name = definition.name;
    this.usage = definition.usage;
    this.alias = definition.alias;
    this.alternatives = definition.alternatives;
    this.type = definition.type;
    this.required = definition.required;
    this.callback = definition.callback;
  }

  /**
   * 校验value值是否符合定义
   */
  abstract validate(): void;

  /**
   *
   */
  public strictSetValue(value?: unknown): void {
    this._value = value;
    this.validate();
  }

  public get strippedName(): string {
    return this.name.replace(/-{1,2}/g, '');
  }

  public get value(): unknown {
    return this._value;
  }

  protected _requireValidation(value?: unknown): void {
    if (this.required && value === void 0) {
      throw new Error(`Required option ${this.name} is missing`);
    }
  }

  public static optionFactory(option: IParserOptionDefinition): ParserOptionAbstract {
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
        throw new Error(`Unknown option type: ${option.type}`);
    }
  }
}

export class StringOption extends ParserOptionAbstract {
  readonly type = OptionTypes.String;
  public validate(): void {
    this._requireValidation(this.value);
  }
}

export class FlagOption extends ParserOptionAbstract {
  validate(): void {
    this._requireValidation(this.value);
  }
}

export class IntOption extends ParserOptionAbstract {
  validate(): void {
    this._requireValidation(this.value);

    if (this.value !== undefined && isNaN(Number(this.value))) {
      throw new Error(`Can't convert '${this.value as string}' to integer number`);
    }
  }
}

export class FloatOption extends ParserOptionAbstract {
  validate(): void {
    this._requireValidation(this.value);

    if (this.value !== undefined && isNaN(Number(this.value))) {
      throw new Error(`Can't convert '${this.value as number}' to float number`);
    }
  }
}

export class ChoicesOption extends ParserOptionAbstract {
  validate(): void {
    this._requireValidation(this.value);

    if (!this.alternatives) {
      throw new Error(`Choices Option is missing the alternative options`);
    }

    if (!Array.isArray(this.alternatives)) {
      throw new TypeError(`Alternatives should be a array with string element`);
    }

    if (!this.alternatives.includes(this.value as string)) {
      throw new Error(`Value ${this.value as string} is not included in alternatives`);
    }
  }
}

export class ArrayOption extends ParserOptionAbstract {
  validate(): void {
    this._requireValidation(this.value);
  }

  /*
   *  @remark
   *   数组参数的话，值肯定是一个数据，所有需要重写一下strictSetValue方法；
   */
  public strictSetValue(value?: unknown): void {
    this.value
      ? (this.value as string[]).push(value as string)
      : super.strictSetValue([]);
  }
}

export type TOption =
  | StringOption
  | FlagOption
  | IntOption
  | FloatOption
  | ChoicesOption
  | ArrayOption;
