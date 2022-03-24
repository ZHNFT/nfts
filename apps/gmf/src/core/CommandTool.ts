import { CommandTool } from '@ntfs/noddy';
import { BuildCycle, PreviewCycle, TestCycle } from '../lifecycle';
import { BuildCommand } from '../commands';

export default class Tools extends CommandTool {
  buildCycle: BuildCycle;
  previewCycle: PreviewCycle;
  testCycle: TestCycle;

  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: `Build, Preview, Publish Your App`
    });

    this.buildCycle = new BuildCycle();
    this.previewCycle = new PreviewCycle();
    this.testCycle = new TestCycle();

    const ctx = {
      hooks: {
        build: this.buildCycle.hook,
        preview: this.previewCycle.hook,
        test: this.testCycle.hook
      }
    };

    const build = new BuildCommand();

    this.addAction(build);
  }
}
