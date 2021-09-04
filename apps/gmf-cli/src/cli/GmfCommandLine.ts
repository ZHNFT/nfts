import { CommandLineTool } from '@gmf/node-command-line';
import { ActionBuild } from './framework/actions/ActionBuild';

export class GmfCommandLine extends CommandLineTool {
  //
  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: 'gmf personal use only!!!'
    });

    const build = new ActionBuild();

    this.addAction(build);
  }
}
