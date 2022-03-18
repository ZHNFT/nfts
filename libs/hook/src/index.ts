export type THookCallback<HookCallbackArgs> = (
  args: HookCallbackArgs
) => void | Promise<void>;

export class Hook<HookNames = string, HookCallbackArgs = unknown> {
  private readonly _hooks: Map<HookNames, THookCallback<HookCallbackArgs>[]>;

  constructor() {
    this._hooks = new Map<HookNames, THookCallback<HookCallbackArgs>[]>();
  }

  /**
   * @method
   *
   * @public
   * */
  public addHook(hookName: HookNames, callback: THookCallback<HookCallbackArgs>): void {
    const callbacks = this._hooks.get(hookName) ?? [];
    callbacks.push(callback);
    this._hooks.set(hookName, callbacks);
  }

  /**
   * @method
   *
   * @public
   * */
  public emitHook(name: HookNames, args: HookCallbackArgs): Promise<any> {
    const _hookCallbacks = this._hooks.get(name);

    if (_hookCallbacks.length > 0) {
      return Hook.serialize(_hookCallbacks, args);
    }

    return Promise.resolve();
  }

  /**
   * 序列化Promise调用，适用于普通函数；
   * @method serialize
   * @param  {THookCallback[]} tasks 待执行的 Promise 任务；
   * @param  {any}             args  传递给方法的参数；
   * @return {Promise<any>}
   */
  public static serialize<HookCallbackArgs>(
    tasks: THookCallback<HookCallbackArgs>[],
    args: HookCallbackArgs
  ): Promise<any> {
    return tasks.reduce((promise, task) => {
      return promise.then(
        () => task(args),
        e => Promise.reject(e)
      );
    }, Promise.resolve(null));
  }

  public static serialCall<HookCallbackArgs>(
    fns: THookCallback<HookCallbackArgs>[],
    caller: (task: THookCallback<HookCallbackArgs>) => Promise<any>
  ): Promise<any> {
    return fns.reduce((promise, currentFn) => {
      return promise.then(
        () => caller(currentFn),
        (e: Error) => Promise.reject(e)
      );
    }, Promise.resolve(null));
  }

  /**
   *
   * 同步执行所有tasks，不关心最后输task执行的顺序；
   * @method parallelCall
   * @param  {THookCallback[]}   fns
   * @param  {THookCallback() =>  Promise<any>} caller
   * @return {Promise<any>}
   */
  public static parallelCall<HookCallbackArgs>(
    fns: THookCallback<HookCallbackArgs>[],
    caller: (task: THookCallback<HookCallbackArgs>) => void | Promise<void>
  ): Promise<any> {
    return Promise.all(fns.map(fn => caller(fn)));
  }
}
