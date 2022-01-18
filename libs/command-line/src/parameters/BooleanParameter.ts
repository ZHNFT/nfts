import { BaseParameter, IBaseParameterInitOptions } from '../base/BaseParameter';

export interface IBooleanParameterInitOptions extends IBaseParameterInitOptions {
  //
}

export class BooleanParameter extends BaseParameter {
  constructor(options: IBooleanParameterInitOptions) {
    super(options);
  }
}
