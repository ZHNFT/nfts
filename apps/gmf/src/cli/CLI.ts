import CommandTool from "./CommandTool";

export default class CLI extends CommandTool {
  run(): Promise<void> {
    return this.exec();
  }
}
