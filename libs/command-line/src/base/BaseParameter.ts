import { IArgumentParamDefinition } from '@ntfs/node-arg-parser';

export type TFunction = () => void;

export interface IBaseParameterInitOptions extends IArgumentParamDefinition {
  /**
   * 参数对应的执行方法
   */
  callback: TFunction;
}

export class BaseParameter implements IArgumentParamDefinition {
  longName: string;
  summary: string;
  callback: TFunction;

  shortName?: string;
  required?: boolean;

  public constructor(opts: IBaseParameterInitOptions) {
    this.longName = opts.longName;
    this.shortName = opts.shortName;
    this.required = opts.required;
    this.callback = opts.callback;
    this.summary = opts.summary;
  }
}
