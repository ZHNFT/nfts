import { CommandTool } from '@nfts/noddy';
import { PluginManager } from '../classes/PluginManager';
import { Configuration } from '../classes/Configuration';
import { BuildCommand } from './commands/BuildCommand';
import { BuildHook, THooks } from '../hook';

export default class GmfTool extends CommandTool {
  private _pluginManager: PluginManager;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Build, Preview, Test Your App`
    });

    const buildHook = new BuildHook();

    const hooks: THooks = {
      build: buildHook
    };

    const _config = new Configuration();
    this._pluginManager = new PluginManager(_config, hooks);

    const build = new BuildCommand({ hook: buildHook });

    this.addAction(build);
  }

  public async exec(): Promise<void> {
    await this._pluginManager.initAsync();
    return super.exec();
  }
}
