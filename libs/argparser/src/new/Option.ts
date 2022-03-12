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
  public validate(value: any): void {
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
