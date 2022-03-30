import { CommandTool } from '@nfts/noddy';
import { BuildCycle, PreviewCycle, TestCycle } from '../lifecycle';
import { PluginManager } from '../classes/PluginManager';
import { Configuration } from '../classes/Configuration';
import { BuildCommand } from './commands/BuildCommand';

export default class GmfTool extends CommandTool {
  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Build, Preview, Test Your App`
    });

    const _config = new Configuration();
    const _pluginManager = new PluginManager();

    const buildCycle = new BuildCycle();
    const previewCycle = new PreviewCycle();
    const testCycle = new TestCycle();

    const build = new BuildCommand();

    this.addAction(build);
  }

  public exec(): Promise<void> {
    return super.exec();
  }
}
