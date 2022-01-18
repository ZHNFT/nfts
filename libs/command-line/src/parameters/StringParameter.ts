import { BaseParameter, IBaseParameterInitOptions } from '../base/BaseParameter';

export interface IStringParameterInitOptions extends IBaseParameterInitOptions {
  //
}

export class StringParameter extends BaseParameter {
  constructor(options: IStringParameterInitOptions) {
    super(options);
  }
}
