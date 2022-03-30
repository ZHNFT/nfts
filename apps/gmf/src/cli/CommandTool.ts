import { CommandTool } from '@nfts/noddy';
import { PluginManager } from '../classes/PluginManager';
import { Configuration } from '../classes/Configuration';
import { BuildCommand } from './commands/BuildCommand';
import { BuildLifecycle } from '../lifecycle/BuildCycle';

export default class GmfTool extends CommandTool {
  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Build, Preview, Test Your App`
    });

    const _config = new Configuration();
    const _pluginManager = new PluginManager();

    const buildCycle = new BuildLifecycle();

    const build = new BuildCommand();

    this.addAction(build);
  }

  public exec(): Promise<void> {
    return super.exec();
  }
}
