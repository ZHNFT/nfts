import { CommandTool } from '@nfts/noddy';
import { BuildCycle, PreviewCycle, TestCycle } from '../lifecycle';
import { BuildCommand } from '../commands';
import { PluginContext } from './Plugin';
import Config from './Config';

export default class GmfTool extends CommandTool {
  config: Config;

  buildCycle: BuildCycle;
  previewCycle: PreviewCycle;
  testCycle: TestCycle;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Build, Preview, Test Your App`
    });

    this.config = new Config();

    this.buildCycle = new BuildCycle();
    this.previewCycle = new PreviewCycle();
    this.testCycle = new TestCycle();

    const ctx: PluginContext = {
      config: this.config,
      hook: {
        build: this.buildCycle,
        preview: this.previewCycle,
        test: this.testCycle
      }
    };

    const build = new BuildCommand();

    build.load({ ctx, lifecycle: this.buildCycle });

    this.addAction(build);
  }

  public exec(): Promise<void> {
    return super.exec();
  }
}
