import { IBaseOption, Option } from './Option';

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
  abstract option(option: IBaseOption): void;
}

export type TArgumentValues = {
  _: string;
  [key: string]: string | boolean | undefined;
};

export class Argument implements ArgumentBase {
  readonly name: string;
  readonly description: string;

  readonly belongTo: string;

  private readonly _options: Option[] = [];

  constructor({ name, description, belongTo }: IBaseArgument & { belongTo?: string }) {
    this.name = name;
    this.description = description;
    this.belongTo = belongTo;
  }

  public option(definition: IBaseOption): void {
    this._options.push(
      new Option({
        name: definition.name,
        description: definition.description,
        required: definition.required,
        alias: definition.alias,
        belongTo: ''
      })
    );
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

  public getOptionValues(
    options: Option[] = [],
    values: { option: string; value: string | boolean | undefined }[]
  ): TArgumentValues {
    const _obj = {
      _: this.name
    } as TArgumentValues;
    const _opts = this.collectDefinedOptions(options);

    for (let i = 0; i < _opts.length; i++) {
      const _opt = _opts[i];
      const { option, value } = values.find(({ option }) => option === _opt.name) ?? {};

      if (option) {
        Object.defineProperty(_obj, _opt.strippedName(), {
          value,
          enumerable: true,
          configurable: false,
          writable: false
        });
      }
    }

    return _obj;
  }
}
