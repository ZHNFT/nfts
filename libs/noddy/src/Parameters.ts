import {
  StringOption,
  ArrayOption,
  FloatOption,
  FlagOption,
  IntOption
} from '@ntfs/argparser';

export { StringOption, ArrayOption, FloatOption, FlagOption, IntOption };

export type TOption = StringOption | ArrayOption | FloatOption | FlagOption | IntOption;

export default class Parameters {
  private readonly _parameters: TOption[] = [];

  public findParameter(name: string): TOption | undefined {
    return this._parameters.find(parameter => parameter.name === name);
  }

  public addParameter(param: TOption): void {
    this._parameters.push(param);
  }
}
