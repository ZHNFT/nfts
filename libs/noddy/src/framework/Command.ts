import { SubParser } from '@nfts/argparser';

export abstract class Command {
  public readonly subParser: SubParser;

  protected constructor({
    commandName,
    commandDescription
  }: {
    commandName: string;
    commandDescription: string;
  }) {
    this.subParser = new SubParser(commandName, commandDescription);
    this.onDefineParameters();
  }

  get name(): string {
    return this.subParser.name;
  }

  /**
   * 执行逻辑
   */
  abstract onExecute(args?: unknown): Promise<void>;

  /**
   * 命令行参数配置逻辑
   */
  abstract onDefineParameters(): void;
}
