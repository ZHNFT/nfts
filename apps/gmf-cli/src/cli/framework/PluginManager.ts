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

/**
 * 插件函数的上下文对象
 */
export interface PluginContext {
  hooks: {
    build: SyncHook<any>;
  };
  config: GmfConfig;
  logger: Logger;
}

export type PluginImpl = (ctx: PluginContext, options: any) => void;

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
      const p = await import(path.resolve(this._config.cwd, 'dist', name));
      p.default.call(null, this._ctx, options);
    }
  }
}
