import { ImportModule } from '@nfts/node-utils-library';
import { Command, DebugTool } from '@nfts/noddy';
import { Configuration } from './Configuration';
import { Plugin } from './Plugin';
import { THooks } from '../hook';
import typescriptPlugin from '../internal-plugins/typescript/TypescriptPlugin';
import jestPlugin from '../internal-plugins/jest/JestPlugin';
import Constants from '../Constants';

export class PluginManager {
  private readonly _config: Configuration;
  private readonly _hooks: THooks;
  private readonly _command: Command;

  constructor(config: Configuration, hooks: THooks, command: Command) {
    this._config = config;
    this._hooks = hooks;
    this._command = command;
  }

  public async initAsync(): Promise<void> {
    this.applyPlugin(typescriptPlugin);
    this.applyPlugin(jestPlugin);

    await this._applyConfigPlugins();
  }

  /*
   * 加载多个插件的方式只提供内部解析配置文件的时候使用
   * */
  private async _applyConfigPlugins() {
    const _config = this._config.loadConfig(Constants.GMF_CONFIG_PATH);

    if (_config?.plugins) {
      for await (const plugin of _config.plugins) {
        const { pluginName } = plugin;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const _pluginInstance = ImportModule.import(pluginName).default as Plugin;
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
      command: this._command,
      getScopeLogger: (scope: string) => {
        return DebugTool.Debug.getScopedLogger(scope);
      }
    });
  }

  public applyPlugin(plugin: Plugin): void {
    void plugin.apply({
      hook: this._hooks,
      config: this._config,
      command: this._command,
      getScopeLogger: (scope: string) => {
        return DebugTool.Debug.getScopedLogger(scope);
      }
    });
  }
}
