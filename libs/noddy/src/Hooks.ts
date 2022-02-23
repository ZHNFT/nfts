import { Hook, SyncHook } from 'tapable';

type StringKeyMap<T> = {
  [key: string]: T;
};

export class Hooks<C extends unknown> {
  private _selectedHook: Hook<C, any>;
  private _hooks: StringKeyMap<Hook<Readonly<C>, any>>;

  /**/
  public addHook(name: string) {
    this._hooks[name] = new SyncHook<C>();
  }

  /**/
  public getHook(name: string): Hook<C, any> | undefined {
    this._selectedHook = this._hooks[name];
    if (!this._selectedHook) {
      throw Error(`Hook [${name}] is not exist`);
    }
    return this._selectedHook;
  }

  /**/
  async execHook(ctx: any) {
    if (!this._selectedHook) {
      throw new Error(`Please call .getHook(hookName) first to peek a hook`);
    }

    if (this._selectedHook.isUsed()) {
      throw Error(`Hook [${this._selectedHook.name}] is already used`);
    }

    return this._selectedHook.promise(...ctx);
  }
}
