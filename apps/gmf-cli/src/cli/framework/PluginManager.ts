/**
 * @class PluginManager 管理所有注册到GCL中的插件
 */

import { GmfConfig, GmfConfigSchema } from './GmfConfig';
import { Logger } from './Logger';
import * as path from 'path';
import { SyncHook } from 'tapable';

export interface PluginConfig {
  name: string;
  options: unknown;
}

export interface CustomActionConfig {
  name: string;
  apply: () => void;
}

/**
 * 插件函数的上下文对象
 */
export interface PluginContext {
  hooks: {
    build: SyncHook<any>;
  };
  config: GmfConfig;
  logger: Logger;
  addAction: (actionConfig: CustomActionConfig) => void;
}

export type PluginImpl<T = unknown> = (ctx: PluginContext, options: T) => void;

export class PluginManager {
  _ctx: PluginContext;
  _config: GmfConfig;
  _logger: Logger;

  _plugins: PluginImpl[] = [];

  constructor(ctx: PluginContext, config: GmfConfig, logger: Logger) {
    this._ctx = ctx;
    this._config = config;
    this._logger = logger;
  }

  /**
   * 从配置中读取并执行plugin方法
   */
  async invokePlugins(): Promise<void> {
    const { plugins } = this._config.lookup<GmfConfigSchema>();
    for await (const { name, options } of plugins) {
      // import(path.resolve(this._config.cwd, 'dist', name));
      const p = await this.resolvePlugin(name);
      p.call(null, this._ctx, options);
    }
  }

  async resolvePlugin(pluginModulePath: string): Promise<PluginImpl> {
    let plugin: { default?: PluginImpl } = {};

    try {
      plugin = await import(pluginModulePath);
    } catch (e) {
      plugin.default = await this.resolvePluginLocal(pluginModulePath);
    }

    return plugin.default;
  }

  async resolvePluginLocal(pluginModulePath: string): Promise<PluginImpl> {
    let plugin: { default?: PluginImpl };

    // todo: dist需要被配置替换
    // eslint-disable-next-line prefer-const
    plugin = await import(
      path.resolve(this._config.cwd, 'dist', pluginModulePath)
    );

    return plugin.default;
  }
}
