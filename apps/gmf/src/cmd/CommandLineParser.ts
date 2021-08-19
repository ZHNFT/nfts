import { CommandLineTool } from '@raydium/command-line-tool';

export default class CommandLineParser extends CommandLineTool {
  constructor() {
    super({
      name: 'gmf',
      description: 'gmf good good good good good !!!'
    });
  }

  /**
   * @public
   */
  async execute(): Promise<void> {}
}
