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

export interface IBaseSubCommand extends ISubCommandLineInitOption {}

export class BaseSubCommand implements IBaseSubCommand {
  readonly subCommandName: string;
  readonly subCommandDescription: string;

  readonly parser: ArgumentsParser;

  protected constructor({
    subCommandName,
    subCommandDescription
  }: ISubCommandLineInitOption) {
    this.subCommandName = subCommandName;
    this.subCommandDescription = subCommandDescription;

    /**
     * 独立解析
     */
    this.parser = new ArgumentsParser();
  }
  apply() {}
}
