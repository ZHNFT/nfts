import { Parser } from '@ntfs/node-arg-parser';

export interface ISubCommandLineInitOption {
  readonly subCommandName: string;
  readonly subCommandDescription: string;
  readonly parser: Parser;
}

export interface IBaseSubCommand {
  readonly subCommandName: string;
  readonly subCommandDescription: string;
}

export abstract class BaseSubCommand implements IBaseSubCommand {
  readonly subCommandName: string;
  readonly subCommandDescription: string;

  protected readonly parser: Parser;

  protected constructor({
    subCommandName,
    subCommandDescription,
    parser
  }: ISubCommandLineInitOption) {
    this.subCommandName = subCommandName;
    this.subCommandDescription = subCommandDescription;
    this.parser = parser;
    this.onParametersDefine(parser);
  }

  /**
   * 主要的执行方法
   * @method apply
   * @return {Promise<void>} [description]
   */
  public abstract apply(): Promise<void>;

  /**
   * 在该方法中定义命令行参数
   * @method onParametersDefine
   */
  public abstract onParametersDefine(parser: Parser): void;
}
