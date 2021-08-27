import { NodeCommandLine } from '@gmf/node-command-line';
import { ActionBuild } from './tools/actions';

export class CommandLineParser extends NodeCommandLine {
  constructor() {
    super({
      toolName: 'gmf-cli',
      toolDescription: 'Show me the money'
    });

    const build = new ActionBuild();

    const context = {
      build: build.plugins.initializePlugins()
    };
  }
}
