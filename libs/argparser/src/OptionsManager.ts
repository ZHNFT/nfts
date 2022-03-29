import {
  TOption,
  StringOption,
  ArrayOption,
  StringOptionDefinition,
  ArrayOptionDefinition,
  FlagOptionDefinition,
  FlagOption
} from './option';

export class OptionsManager {
  readonly options: TOption[] = [];

  public getOption(name: string): TOption {
    return this.options.find(opt => opt.name === name);
  }

  public stringOption(definition: StringOptionDefinition): StringOption {
    const option = new StringOption(definition);
    this.options.push(option);
    return option;
  }

  public flagOption(definition: FlagOptionDefinition): FlagOption {
    const option = new FlagOption(definition);
    this.options.push(option);
    return option;
  }

  public arrayOption(definition: ArrayOptionDefinition): ArrayOption {
    const option = new ArrayOption(definition);
    this.options.push(option);
    return option;
  }
}
