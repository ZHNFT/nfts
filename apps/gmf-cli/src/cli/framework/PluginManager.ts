/**
 * @class PluginManager 管理所有注册到GCL中的插件
 */

import { GmfConfig, GmfConfigSchema } from './GmfConfig';
import { Logger } from './Logger';
import * as path from 'path';

export interface PluginConfig {
  name: string;
  options: unknown;
}

export type PluginImpl = (ctx: any, options: any) => void;

export class PluginManager {
  _ctx: any;
  _config: GmfConfig;
  _logger: Logger;

  _plugins: PluginImpl[] = [];

  constructor(ctx: any, config: GmfConfig, logger: Logger) {
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
