import CommandTool from '../core/CommandTool';

export default class CLI extends CommandTool {
  constructor() {
    super({
      toolName: 'gmf',
      toolDescription: 'Development toolchain'
    });
  }

  run(): Promise<void> {
    return this.exec();
  }
}
