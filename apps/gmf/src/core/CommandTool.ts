import { CommandTool } from '@nfts/noddy';
import { BuildCycle, PreviewCycle, TestCycle } from '../lifecycle';
import { BuildCommand } from '../commands';
import { PluginContext } from '../classes/Plugin';

export default class GmfTool extends CommandTool {
  buildCycle: BuildCycle;
  previewCycle: PreviewCycle;
  testCycle: TestCycle;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Build, Preview, Test Your App`
    });

    this.buildCycle = new BuildCycle();
    this.previewCycle = new PreviewCycle();
    this.testCycle = new TestCycle();

    const ctx: PluginContext = {
      hook: {
        build: this.buildCycle,
        preview: this.previewCycle,
        test: this.testCycle
      }
    };

    const build = new BuildCommand();

    this.addAction(build);
  }

  public exec(): Promise<void> {
    return super.exec();
  }
}
