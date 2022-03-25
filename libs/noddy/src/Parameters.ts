import { TOption } from '@nfts/argparser';

export default class Parameters {
  public readonly parameters: TOption[] = [];

  public findParameter(name: string): TOption | undefined {
    return this.parameters.find((parameter: TOption) => parameter.name === name);
  }

  public addParameter(param: TOption): void {
    this.parameters.push(param);
  }
}
