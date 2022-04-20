import { Async } from '@nfts/node-utils-library';

export class Hook<HookNames = string, HookCallbackArgs = void> {
  private readonly _hooks: Map<HookNames, Async.Task<HookCallbackArgs>[]>;

  constructor() {
    this._hooks = new Map<HookNames, Async.Task<HookCallbackArgs>[]>();
  }

  public addHook(hookName: HookNames, callback: Async.Task<HookCallbackArgs>): void {
    const callbacks = this._hooks.get(hookName) ?? [];
    callbacks.push(callback);
    this._hooks.set(hookName, callbacks);
  }
  public emitHook(hookName: HookNames, args: HookCallbackArgs): Promise<void> {
    const _hookCallbacks = this._hooks.get(hookName);

    if (_hookCallbacks && _hookCallbacks.length > 0) {
      return Async.serialize(_hookCallbacks, args);
    }

    return Promise.resolve();
  }
}
