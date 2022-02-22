import {
  BooleanOption,
  ChoicesOption,
  StringOption,
  ArrayOption,
  TOptionDefinition,
  IBaseArrayOptionDefinition,
  IBaseStringOptionDefinition,
  IBaseBooleanOptionDefinition,
  IBaseChoicesOptionDefinition
} from './classes/OptionClasses';

export class CommandLineOptions {
  private _options: TOptionDefinition[];

  public defineStringOption(args: IBaseStringOptionDefinition) {
    const _option = new StringOption(args);
    this._options.push(_option);
  }

  public defineBooleanOption(args: IBaseBooleanOptionDefinition) {
    const _option = new BooleanOption(args);
    this._options.push(_option);
  }

  public defineChoicesOption(args: IBaseChoicesOptionDefinition) {
    const _option = new ChoicesOption(args);
    this._options.push(_option);
  }

  public defineArrayOption(args: IBaseArrayOptionDefinition) {
    const _option = new ArrayOption(args);
    this._options.push(_option);
  }
}
