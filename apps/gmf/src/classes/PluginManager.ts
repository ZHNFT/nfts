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
    this._applyPlugins();
  }

  private isUsed(pluginName: string): boolean {
    return this._usedPluginNames.includes(pluginName);
  }

  /*
   * 加载多个插件的方式只提供内部解析配置文件的时候使用
   * */
  private _applyPlugins() {
    const { plugins } = this._config.loadConfig();
    plugins.forEach(plugin => {
      const { pluginName } = plugin;
      const _pluginInstance = ImportModule.importModule(pluginName) as Plugin;

      this.applyPlugin(_pluginInstance);
    });
  }

  /*
   * 单个插件的添加提供给内外部使用
   * */
  public applyPlugin(plugin: Plugin) {
    this._plugins.push(plugin);
    console.log(`Initialling <${plugin.name}>`);
    void plugin.apply({
      hook: this._hooks,
      config: this._config
    });
    this._usedPluginNames.push(plugin.name);
  }
}
