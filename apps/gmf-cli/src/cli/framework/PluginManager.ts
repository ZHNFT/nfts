/**
 * @class PluginManager 管理所有注册到GCL中的插件
 */

import { GmfConfig } from './GmfConfig';
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

export interface ExecutionContext {
  name: string;
}

/**
 * 插件函数的上下文对象
 */
export interface PluginContext {
  hooks: {
    build: SyncHook<ExecutionContext>;
  };
  config: GmfConfig;
  logger: Logger;
  addAction: (actionConfig: CustomActionConfig) => void;
}

export type PluginImpl<T = unknown> = (ctx: PluginContext, options: T) => void;

export class PluginManager {
  readonly _ctx: PluginContext;
  readonly _config: GmfConfig;
  readonly _logger: Logger;

  _pluginConfigByName: Map<string, PluginConfig> = new Map();

  constructor(
    readonly ctx: PluginContext,
    readonly config: GmfConfig,
    readonly logger: Logger
  ) {
    this._ctx = ctx;
    this._config = config;
    this._logger = logger;

    const gmfConfig = this._config.lookup();

    const { plugins = [] } = gmfConfig;

    this.logger.log(`解析开始`);

    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i];
      this.logger.log(`    读取插件配置： ${plugin.name}`);
      this._pluginConfigByName.set(plugin.name, plugin);
    }

    this.logger.log(`解析完成`);
  }

  /**
   * 从配置中读取并执行plugin方法
   */
  async invokePlugins(): Promise<void> {
    const pluginNames = this._pluginConfigByName.keys();

    this.logger.log(`执行插件开始`);

    for await (const name of pluginNames) {
      const { options } = this._pluginConfigByName.get(name);
      this.logger.log(`    执行插件方法： ${name}`);
      const p = await this._resolvePlugin(name);
      p.call(null, this._ctx, options);
    }

    this.logger.log(`执行插件结束`);
  }

  private async _resolvePlugin(pluginModulePath: string): Promise<PluginImpl> {
    let plugin: { default?: PluginImpl } = {};

    try {
      plugin = await import(pluginModulePath);
    } catch (e) {
      plugin.default = await this._resolvePluginLocal(pluginModulePath);
    }

    return plugin.default;
  }

  private async _resolvePluginLocal(
    pluginModulePath: string
  ): Promise<PluginImpl> {
    let plugin: { default?: PluginImpl };

    // todo: dist需要被配置替换
    // eslint-disable-next-line prefer-const
    plugin = await import(
      path.resolve(this._config.cwd, 'dist', pluginModulePath)
    );

    return plugin.default;
  }
}
