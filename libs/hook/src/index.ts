export type THookCallback = (...arg: any) => void | Promise<void>;

export class Hook {
  private readonly _hooks: Map<string, THookCallback>;

  constructor() {
    this._hooks = new Map<string, THookCallback>();
  }

  /**
   * @method
   *
   * @public
   * */
  public addHook(hookName: string, callback: THookCallback) {
    this._hooks.set(hookName, callback);
  }

  /**
   * @method
   *
   * @public
   * */
  public emitHook(name: string, args: any) {
    const _hookCallback = this._hooks.get(name);

    if (_hookCallback) {
      _hookCallback.call(null, args);
    }
  }

  /**
   * @method
   *
   * @public
   * */
  public promise(args: any): Promise<void> {
    return Hook.serialCall(Array.from(this._hooks.values()), args);
  }

  public static serialCall(fns: THookCallback[], args: any): Promise<void> {
    return fns.reduce((promise, currentFn) => {
      return promise.then(
        () => currentFn(args),
        (e: Error) => Promise.reject(e)
      );
    }, Promise.resolve(null));
  }

  public static parallelCall(fns: THookCallback[], args: any) {
    return Promise.all(fns.map(fn => fn.call(null, args)));
  }
}
