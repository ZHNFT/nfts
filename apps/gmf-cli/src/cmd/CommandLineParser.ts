import {
  NodeCommandLine,
  CLICommandParsedArgs,
  argsParser
} from '@gmf/node-command-line';
import { ActionBuild, ActionTest, ActionEsm } from './tools/actions';
import { Lifecycle } from './tools/Lifecycle';
import { GmfConfig, PluginManager } from './tools/PluginManager';
import { Config } from './tools/Config';

export class CommandLineParser extends NodeCommandLine {
  _pluginManager: PluginManager;
  _config: Config<GmfConfig>;

  _cliArgs: CLICommandParsedArgs;
  _execCommand: string;

  constructor() {
    super({
      toolName: 'gmf-cli',
      toolDescription: 'Show me the money'
    });

    const lifecycle: Lifecycle = new Lifecycle();
    const config: Config<GmfConfig> = new Config({
      cwd: process.cwd(),
      configFile: './config/gmf.json'
    });

    const build = new ActionBuild();
    const test = new ActionTest();
    const esm = new ActionEsm();

    const context = {
      build: build.plugins.initializePlugins(),
      test: test.plugins.initializePlugins(),
      esm: esm.plugins.initializePlugins()
    };

    this._pluginManager = new PluginManager(context, lifecycle, config);
  }

  public prepare(): CommandLineParser {
    return this;
  }
}
