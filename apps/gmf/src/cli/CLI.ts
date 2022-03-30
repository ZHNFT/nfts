import CommandTool from '../classes/CommandTool';

export default class CLI extends CommandTool {
  constructor() {
    super();
  }

  run(): Promise<void> {
    return this.exec();
  }
}
