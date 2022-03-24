import CommandTool from '../core/CommandTool';

export default class CLI extends CommandTool {
  constructor() {
    super();
  }

  run(): Promise<void> {
    return this._exec();
  }
}
