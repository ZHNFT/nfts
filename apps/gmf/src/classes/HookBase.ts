import { Hook, THookCallback } from '@nfts/hook';

/*
 * 插件的注册
 * */
export abstract class HookBase<HookContext = unknown> {
  public readonly hookName: string;
  private readonly _hook: Hook<string, HookContext>;

  protected constructor(hookName: string) {
    this.hookName = hookName;
    this._hook = new Hook<string, HookContext>();
  }

  addHook(hook: THookCallback<HookContext>) {
    this._hook.addHook(this.hookName, hook);
  }

  public async call(args?: HookContext): Promise<void> {
    await this._hook.emitHook(this.hookName, args);
  }
}
