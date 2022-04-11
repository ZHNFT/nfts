import { CommandTool } from '@nfts/noddy';
import { PluginManager } from '../classes/PluginManager';
import { Configuration } from '../classes/Configuration';
import { BuildCommand } from './commands/BuildCommand';
import { BuildHook, THooks } from '../hook';
import { Logger } from '../classes/Logger';

export default class GmfTool extends CommandTool {
  private readonly _pluginManager: PluginManager;
  private readonly _logger: Logger;
  private readonly _config: Configuration;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Build, Preview, Test Your App`
    });

    const buildHook = new BuildHook();

    const hooks: THooks = {
      build: buildHook
    };

    this._config = new Configuration();
    this._logger = Logger.getLogger();
    this._pluginManager = new PluginManager(this._config, hooks, this._logger);

    const build = new BuildCommand({ hook: buildHook });

    this.addAction(build);
  }

  public async exec(): Promise<void> {
    await this._pluginManager.initAsync();
    return super.exec();
  }
}
