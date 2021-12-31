import {
  ArgumentsParser,
  ArgumentParamKinds,
  IArgumentParamDefinition
} from '@ntfs/node-arg-parser';

export type AsyncFunction<T extends unknown> = () => Promise<T>;

export interface IBaseParameterInitOptions extends IArgumentParamDefinition {
  /**
   * 参数对应的执行方法
   */
  callback: AsyncFunction<unknown>;
}

export class BaseParameter implements IArgumentParamDefinition {
  longName: string;
  summary: string;
  callback?: AsyncFunction<unknown>;

  public constructor(opts: IBaseParameterInitOptions) {
    this.longName = opts.longName;
    this.summary = opts.summary;
    this.callback = opts.callback;
  }
}
