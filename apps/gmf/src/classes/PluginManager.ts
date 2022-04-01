import { ImportModule } from '@nfts/node-utils-library';
import { Configuration } from './Configuration';
import { Plugin } from './Plugin';
import { THooks } from '../hook';

export class PluginManager {
  private readonly _plugins: Plugin[];
  private readonly _config: Configuration;
  private readonly _hooks: THooks;
  private readonly _usedPluginNames: string[];

  constructor(config: Configuration, hooks: THooks) {
    this._config = config;
    this._hooks = hooks;
    this._plugins = [];
    this._usedPluginNames = [];
  }

  public isUsed(pluginName: string): boolean {
    return this._usedPluginNames.includes(pluginName);
  }

  public async initAsync(): Promise<void> {
    await this._applyPluginsAsync();
  }

  /*
   * 加载多个插件的方式只提供内部解析配置文件的时候使用
   * */
  private async _applyPluginsAsync() {
    const { plugins } = this._config.loadConfig();

    for await (let plugin of plugins) {
      const { pluginName } = plugin;
      const _pluginInstance = ImportModule.importModule(pluginName) as Plugin;
      await this.applyPluginAsync(_pluginInstance);
    }
  }

  /*
   * 单个插件的添加提供给内外部使用
   * */
  public async applyPluginAsync(plugin: Plugin): Promise<void> {
    this._plugins.push(plugin);
    console.log(`Initialling <${plugin.name}>`);
    await plugin.apply({
      hook: this._hooks,
      config: this._config
    });
    this._usedPluginNames.push(plugin.name);
    console.log(`Plugin <${plugin.name}> loaded`);
  }
}
