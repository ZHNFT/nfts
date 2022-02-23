import { IBaseOption, Option } from './Option';
import { Command } from './Command';

export interface IBaseArgument {
  readonly name: string;
  readonly description: string;
  readonly belongTo?: string;
}

export abstract class ArgumentBase implements IBaseArgument {
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly belongTo: string;
  abstract readonly options: Option[];

  abstract option(option: IBaseOption): void;
}

export type TArgumentValues = {
  _?: string;
  [key: string]: string | boolean | undefined;
};

export class Argument implements ArgumentBase {
  readonly name: string;
  readonly description: string;

  readonly belongTo: string;

  private readonly _values: Record<string, string | boolean | undefined> = {};
  private readonly _options: Option[] = [];

  constructor({ name, description, belongTo }: IBaseArgument & { belongTo?: string }) {
    this.name = name;
    this.description = description;
    this.belongTo = belongTo;
  }

  public option(definition: IBaseOption): Option {
    const _option = new Option({
      name: definition.name,
      description: definition.description,
      required: definition.required,
      alias: definition.alias,
      belongTo: this.name
    });

    this._options.push(_option);

    return _option;
  }

  /**
   *
   */
  get options(): Option[] {
    return this._options;
  }

  /**
   *
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
  public setValue(key: string, value: string | boolean | undefined) {
    this._values[key] = value;
  }
}
