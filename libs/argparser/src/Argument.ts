import { IOptionDefinition, Option, TOptionValue } from './Option';

export interface IArgumentDefinition {
  readonly name: string;
  readonly description: string;
  readonly belong?: string;
}

export type TArgumentValues = {
  _?: string;
  [key: string]: TOptionValue;
};

export class Argument implements IArgumentDefinition {
  readonly name: string;
  readonly description: string;

  readonly belong: string;

  private readonly _values: Record<string, TOptionValue> = {};
  private readonly _options: Option[] = [];

  constructor({ name, description, belong }: IArgumentDefinition) {
    this.name = name;
    this.description = description;
    this.belong = belong;
  }

  /**
   * 向argument中添加option
   * */
  public option(definition: IOptionDefinition): Option {
    const _option = new Option({
      name: definition.name,
      description: definition.description,
      required: definition.required,
      alias: definition.alias,
      belong: this.name
    });

    this._options.push(_option);

    return _option;
  }

  /**
   * 获取所有argument下的options
   */
  get options(): Option[] {
    return this._options;
  }

  /**
   * 返回所有输入argument的option的值，以Object的形式返回
   */
  get values(): TArgumentValues {
    return {
      ...this._values
    } as TArgumentValues;
  }

  /**
   *
   * @param key
   * @param value
   */
  public setValue(key: string, value: string | boolean | undefined): void {
    this._values[key] = value;
  }

  /**
   *
   * @param name
   */
  public getOption(name: string): Option | undefined {
    for (let i = 0; i < this._options.length; i++) {
      if (this._options[i].name === name) {
        return this._options[i];
      }
    }

    return undefined;
  }
}
