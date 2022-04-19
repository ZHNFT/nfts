import { CommandLine, MeasureTool, DebugTool } from '@nfts/noddy';
import { PluginManager } from '../classes/PluginManager';
import { Configuration } from '../classes/Configuration';
import { BuildCommand } from './commands/BuildCommand';
import { BuildHook, THooks } from '../hook';

export default class GmfTool extends CommandLine {
  private readonly _pluginManager: PluginManager;
  private readonly _config: Configuration;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Develop toolchain`
    });

    const buildHook = new BuildHook();

    const hooks: THooks = {
      build: buildHook
    };

    this._config = new Configuration();
    this._pluginManager = new PluginManager(this._config, hooks);

    const build = new BuildCommand({ hook: buildHook });

    this.addCommand(build);
  }

  public async exec(): Promise<void> {
    await this._pluginManager.initAsync();
    return super.execute();
  }
}
