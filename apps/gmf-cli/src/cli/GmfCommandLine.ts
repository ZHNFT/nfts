import { CommandLineTool } from '@gmf/node-command-line';
import { ActionBuild } from './framework/actions/ActionBuild';
import { GmfConfig } from './framework/GmfConfig';
import {
  CustomActionConfig,
  PluginContext,
  PluginManager
} from './framework/PluginManager';
import { Logger } from './framework/Logger';

export class GmfCommandLine extends CommandLineTool {
  //
  readonly _pluginManager: PluginManager;
  readonly _logger: Logger;
  readonly _config: GmfConfig;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: 'gmf personal use only!!!'
    });

    this._logger = new Logger();
    this._config = new GmfConfig({
      configFile: './config/gmf.json',
      cwd: process.cwd()
    });

    const build = new ActionBuild();

    /// 通用的Options，统一注册
    this.addCommandOption([
      {
        longName: 'clean',
        shortName: 'c',
        description: 'Cleanup build files'
      }
    ]);

    /// 提供给plugin的上下文对象
    const pluginContext: PluginContext = {
      hooks: {
        build: build.initializeHook()
      },
      config: this._config,
      logger: this._logger,
      addAction: (action: CustomActionConfig) => {
        //
      }
    };

    this._pluginManager = new PluginManager(
      pluginContext,
      this._config,
      this._logger
    );

    this.addAction(build);
  }

  prepare(): GmfCommandLine {
    return this;
  }

  async exec(): Promise<void> {
    const { _ } = this.cliArgs;
    const command = _[0];
    await this._pluginManager.invokePlugins();
    this.getAction(command).hook.call(this);
  }
}
