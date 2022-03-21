import { TOption } from '@ntfs/argparser';

export default class Parameters {
  private readonly _parameters: TOption[] = [];

  protected _findParameter(name: string): TOption | undefined {
    return this._parameters.find((parameter: TOption) => parameter.name === name);
  }

  public addParameter(param: TOption): void {
    this._parameters.push(param);
  }
}
