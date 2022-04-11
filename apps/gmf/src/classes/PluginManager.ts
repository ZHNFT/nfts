import { ImportModule } from '@nfts/node-utils-library';
import { Configuration } from './Configuration';
import { Plugin } from './Plugin';
import { THooks } from '../hook';

// #region Internal Plugins
import cleanPlugin from '../internal-plugins/CleanPlugin';
import copyPlugin from '../internal-plugins/CopyPlugin';
import typescriptPlugin from '../internal-plugins/TypescriptPlugin';
import { Logger } from './Logger';
// #endregion

export class PluginManager {
  private readonly _config: Configuration;
  private readonly _hooks: THooks;
  private readonly _logger: Logger;

  constructor(config: Configuration, hooks: THooks, logger: Logger) {
    this._config = config;
    this._hooks = hooks;
    this._logger = logger;
  }

  public async initAsync(): Promise<void> {
    this.applyPlugin(cleanPlugin);
    this.applyPlugin(copyPlugin);
    this.applyPlugin(typescriptPlugin);

    await this._applyPluginsAsync();
  }

  /*
   * 加载多个插件的方式只提供内部解析配置文件的时候使用
   * */
  private async _applyPluginsAsync() {
    const _config = this._config.loadConfig();

    if (_config?.plugins) {
      for await (const plugin of _config.plugins) {
        const { pluginName } = plugin;
        const _pluginInstance = ImportModule.import(pluginName) as Plugin;
        await this.applyPluginAsync(_pluginInstance);
      }
    }
  }

  /*
   * 单个插件的添加提供给内外部使用
   * */
  public async applyPluginAsync(plugin: Plugin): Promise<void> {
    await plugin.apply({
      hook: this._hooks,
      config: this._config,
      logger: this._logger
    });
  }

  public applyPlugin(plugin: Plugin): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    plugin.apply({
      hook: this._hooks,
      config: this._config,
      logger: this._logger
    });
  }
}
