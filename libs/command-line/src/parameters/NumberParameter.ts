import { BaseParameter, IBaseParameterInitOptions } from '../base/BaseParameter';

export interface INumberParameterInitOptions extends IBaseParameterInitOptions {
  //
}

export class NumberParameter extends BaseParameter {
  constructor(options: INumberParameterInitOptions) {
    super(options);
  }
}
