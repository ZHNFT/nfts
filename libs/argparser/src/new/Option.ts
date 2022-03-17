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
  type?: TOptionTypes;
  /*
   * 在type=Choices的情况下的待选项；
   * */
  alternatives?: string[];
  required?: boolean;
  callback?: boolean;
}

export abstract class ParserOptionAbstract implements IParserOptionDefinition {
  readonly name: string;
  /*
   * 可以设置option的别名，一个或者多个；
   * 通常别名只有一个字母：-x
   * */
  readonly alias?: string | string[];
  readonly usage?: string;
  readonly type?: TOptionTypes;
  /*
   * 在type=Choices的情况下的待选项；
   * */
  readonly alternatives?: string[];
  /*
   * Is required field?
   * */
  readonly required?: boolean;

  public value?: unknown;

  protected constructor(definition: IParserOptionDefinition) {
    this.name = definition.name;
    this.usage = definition.usage;
    this.alias = definition.alias;
    this.alternatives = definition.alternatives;
    this.type = definition.type;
    this.required = definition.required;
  }

  /**
   * 校验value值是否符合定义
   */
  abstract validate(): void;

  /**
   *
   */
  public strictSetValue(value?: unknown) {
    this.value = value;
    this.validate();
  }

  public get strippedName(): string {
    return this.name.replace(/\-{1,2}/g, '');
  }

  protected _requireValidation(value?: unknown) {
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

class StringOption extends ParserOptionAbstract {
  value?: string;
  readonly type = OptionTypes.String;
  public validate(): void {
    this._requireValidation(this.value);
  }
}

class FlagOption extends ParserOptionAbstract {
  value?: boolean;
  validate(): void {
    this._requireValidation(this.value);
  }
}

class IntOption extends ParserOptionAbstract {
  value?: number;
  validate(): void {
    this._requireValidation(this.value);

    if (this.value !== undefined && isNaN(Number(this.value))) {
      throw new Error(`Can't convert '${this.value}' to integer number`);
    }
  }
}

class FloatOption extends ParserOptionAbstract {
  value?: number;
  validate(): void {
    this._requireValidation(this.value);

    if (this.value !== undefined && isNaN(Number(this.value))) {
      throw new Error(`Can't convert '${this.value}' to float number`);
    }
  }
}

class ChoicesOption extends ParserOptionAbstract {
  value?: string;
  validate(): void {
    this._requireValidation(this.value);

    if (!this.alternatives) {
      throw new Error(`Choices Option is missing the alternative options`);
    }

    if (!Array.isArray(this.alternatives)) {
      throw new TypeError(`Alternatives should be a array with string element`);
    }

    if (!this.alternatives.includes(this.value)) {
      throw new Error(`Value ${this.value} is not included in alternatives`);
    }
  }
}

class ArrayOption extends ParserOptionAbstract {
  value?: string[];
  validate(): void {
    this._requireValidation(this.value);
  }

  /**
   * @param value
   * @override
   */
  public strictSetValue(value?: unknown) {
    if (!this.value) {
      this.value = [];
    }
    this.value.push(value as string);
    super.strictSetValue(this.value);
  }
}
