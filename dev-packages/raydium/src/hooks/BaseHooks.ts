import { SyncHook } from 'tapable';

export class BaseHooks {
  public readonly pre = new SyncHook();
  public readonly after = new SyncHook();
}

export class PluginHook extends BaseHooks {}
