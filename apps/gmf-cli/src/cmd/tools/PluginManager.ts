import { SyncHook } from 'tapable';
import { PluginContext } from '@gmf/node-command-line';
import { Lifecycle } from './Lifecycle';
import { Config } from './Config';

export interface PluginHooks<C> {
  esm: SyncHook<C>;
  build: SyncHook<C>;
  test: SyncHook<C>;
}

export interface GmfPluginConfig {
  plugin: string | string[];
  pluginOptions: Record<string, any>;
}

export interface GmfConfig {
  name: string;
  version: string;
  plugins: GmfPluginConfig[];
}

/**
 * 负责执行所有的plugin方法
 */
export class PluginManager {
  config: Config<GmfConfig>;
  lifecycle: Lifecycle;
  hooks: PluginHooks<PluginContext>;

  constructor(
    hooks: PluginHooks<PluginContext>,
    lifecycle: Lifecycle,
    config: Config<GmfConfig>
  ) {
    this.hooks = hooks;
    this.config = config;
    this.lifecycle = lifecycle;
  }

  invokeLifecycleStart(name: string) {
    this.config.lookup();
  }
}
