import { CommandTool } from '@nfts/noddy';
import { BuildCycle, PreviewCycle, TestCycle } from '../lifecycle';
import { BuildCommand } from '../commands';

export default class GmfTool extends CommandTool {
  buildCycle: BuildCycle;
  previewCycle: PreviewCycle;
  testCycle: TestCycle;

  constructor() {
    super({ toolName: 'gmf', toolDescription: `Build, Preview, Test Your App` });

    this.buildCycle = new BuildCycle();
    this.previewCycle = new PreviewCycle();
    this.testCycle = new TestCycle();

    const build = new BuildCommand();

    this.addAction(build);
  }

  public exec(): Promise<void> {
    return super.exec();
  }
}
