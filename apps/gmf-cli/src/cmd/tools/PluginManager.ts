import { SyncHook } from 'tapable';
import { PluginContext } from '@gmf/node-command-line';
import { Lifecycle } from './Lifecycle';
import { Config } from './Config';

export interface PluginHooks<C> {
  esm: SyncHook<C>;
  build: SyncHook<C>;
  test: SyncHook<C>;
}

/**
 * 负责执行所有的plugin方法
 */
export class PluginManager {
  config: Config;
  lifecycle: Lifecycle;
  hooks: PluginHooks<PluginContext>;

  constructor(
    hooks: PluginHooks<PluginContext>,
    lifecycle: Lifecycle,
    config: Config
  ) {
    this.hooks = hooks;
    this.lifecycle = lifecycle;
    this.config = config;
  }

  async invokeLifecycleStart(name: string): Promise<void> {}
}
