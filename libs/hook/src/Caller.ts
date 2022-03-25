/**
 * @class Caller
 * */

export type TCall = (...arg: any) => void | Promise<void>;

export class Caller {
  /**
   * 将所有函数按序执行；
   * 用于执行Hook 下注册的插件方法，支持同步和异步
   * */
  public static serial(functions: TCall[], args: any): Promise<any> {
    return functions.reduce((promise, fn) => {
      return promise.then(
        () => fn(args),
        (e: Error) => Promise.reject(e)
      );
    }, Promise.resolve(null));
  }
}
