export interface IBaseParameter {
  /**
   * 参数名称
   */
  paramName: string;
  /**
   * 参数秒速
   */
  paramDescription?: string;
  /**
   * 参数是否必须；
   * 设置了required，但是最后没有解析到，则会抛出异常，给出名称以及描述；
   */
  required?: boolean;
  /**
   * 参数类型；
   * 命令行解析出来的参数全是string类型，需要依据kind来转换成对应的类型来使用，
   * 如果未提供，默认都是string类型。
   */
  paramKind?: string;
}

export interface IBaseParameterInitOptions extends IBaseParameter {
  /**
   * 参数对应的执行方法
   */
  callback(): Promise<void>;
}

export class BaseParameter implements IBaseParameter {
  paramName: string;
  paramDescription?: string;
  required?: boolean;
  paramKind?: string;
  callback?: VoidFunction;

  public constructor(opts: IBaseParameterInitOptions) {
    const { paramName, callback, paramDescription, paramKind, required } = opts;
    this.paramName = paramName;
    this.paramKind = paramKind;
    this.required = required;
    this.paramDescription = paramDescription;

    this.callback = callback;
  }
}
