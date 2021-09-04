import { CommandLineTool } from '@gmf/node-command-line';
import { ActionBuild } from './framework/actions/ActionBuild';
import { GmfConfig } from './framework/GmfConfig';
import { PluginManager } from './framework/PluginManager';
import { Logger } from './framework/Logger';
import * as process from 'process';

export class GmfCommandLine extends CommandLineTool {
  //
  _pluginManager: PluginManager;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: 'gmf personal use only!!!'
    });

    const logger = new Logger();
    const config = new GmfConfig({
      configFile: './config/gmf.json',
      cwd: process.cwd()
    });

    const build = new ActionBuild();

    this.addCommandOption([
      {
        longName: 'plugin',
        description: 'Add extra command plugin'
      },
      {
        longName: 'clean',
        shortName: 'c',
        description: 'Cleanup build files'
      },
      {
        longName: 'sourcemap',
        description: 'Generate sourcemap files'
      }
    ]);

    const pluginContext = {
      hooks: {
        build: build.initializeHook()
      },
      config,
      logger
    };

    this._pluginManager = new PluginManager(pluginContext, config, logger);

    this.addAction(build);
  }

  prepare(): GmfCommandLine {
    return this;
  }

  async exec() {
    await this._pluginManager.invokePlugins();

    const command = this.parser(process.argv.slice(2))._[0];

    this.getAction(command).hook.call(this);

    console.log('exec');
  }
}
