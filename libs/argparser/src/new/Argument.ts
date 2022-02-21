import { TBaseDefinition } from './Command';
import { Option } from './Option';

export class Argument implements TBaseDefinition {
  readonly name: string;
  readonly description: string;

  readonly belongTo: string;

  constructor({ name, description, belongTo }: TBaseDefinition & { belongTo?: string }) {
    this.name = name;
    this.description = description;
    this.belongTo = belongTo;
  }

  /**
   * @desc 返回当前 Arg 设置的参数
   * @param options
   */
  public collectDefinedOptions(options: Option[] = []): Option[] {
    return options.filter(option => option.belongTo === this.name);
  }
}
