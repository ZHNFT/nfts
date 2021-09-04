import { CommandLineTool } from '@gmf/node-command-line';
import { ActionBuild } from './framework/actions/ActionBuild';
import { GmfConfig } from './framework/GmfConfig';

export class GmfCommandLine extends CommandLineTool {
  //
  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: 'gmf personal use only!!!'
    });

    const config = new GmfConfig({
      configFile: './config/gmf.json',
      cwd: process.cwd()
    });

    const build = new ActionBuild();

    this.addCommandOption([
      {
        longName: 'plugin',
        description: 'Add extra command plugin'
      },
      {
        longName: 'clean',
        shortName: 'c',
        description: 'Cleanup build files'
      },
      {
        longName: 'sourcemap',
        description: 'Generate sourcemap files'
      }
    ]);

    this.addAction(build);
  }
}
