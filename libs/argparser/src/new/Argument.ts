import { Option } from './Option';

export interface IBaseArgument {
  readonly name: string;
  readonly description: string;
  readonly belongTo?: string;
}

export abstract class ArgumentBase implements IBaseArgument {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly belongTo: string;

  abstract collectDefinedOptions(options: Option[]): Option[];
}

export class Argument implements ArgumentBase {
  readonly name: string;
  readonly description: string;

  readonly belongTo: string;

  constructor({ name, description, belongTo }: IBaseArgument & { belongTo?: string }) {
    this.name = name;
    this.description = description;
    this.belongTo = belongTo;
  }

  /**
   * @desc 返回当前 Arg 设置的参数
   * @param options
   *
   * @override
   */
  public collectDefinedOptions(options: Option[] = []): Option[] {
    return options.filter(option => option.belongTo === this.name);
  }
}
