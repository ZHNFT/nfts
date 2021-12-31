import { ArgumentsParser } from '@ntfs/node-arg-parser';

export interface ISubCommandLineInitOption {
  /**
   * 子命令名称；
   */
  readonly subCommandName: string;
  /**
   * 子命令描述；
   */
  readonly subCommandDescription: string;
  readonly parser: ArgumentsParser;
}

export interface IBaseSubCommand {}

export abstract class BaseSubCommand implements IBaseSubCommand {
  readonly subCommandName: string;
  readonly subCommandDescription: string;

  private readonly parser: ArgumentsParser;

  protected constructor({
    subCommandName,
    subCommandDescription,
    parser
  }: ISubCommandLineInitOption) {
    this.subCommandName = subCommandName;
    this.subCommandDescription = subCommandDescription;
    this.parser = parser;
  }

  public abstract apply(): Promise<void>;
  public abstract initialize(): IBaseSubCommand;
}
