import CommandTool from '../core/CommandTool';

export class CLI {
  private _argParser: CommandTool;

  constructor() {
    this._argParser = new CommandTool({
      toolName: 'gmf',
      toolDescription: 'Development toolchain'
    });
  }

  run(): Promise<void> {
    return this._argParser.exec();
  }
}
