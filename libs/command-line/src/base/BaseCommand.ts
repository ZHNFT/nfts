import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { BaseSubCommand, ISubCommandLineInitOption } from './BaseSubCommand';

export interface ICommandLineInitOption {
  commandName: string;
  commandDescription: string;
}

export interface ISubCommandLineInitOptionWithCallback extends ISubCommandLineInitOption {
  callback: VoidFunction;
}

/**
 * @desc 使用BaseCommand来构建命令行工具；
 * 			 Command实现类需要具备一下几种必须属性
 * 			 - 1
 * 			 - 2
 *
 * @example
 *
 *
 */
export class BaseCommand implements ICommandLineInitOption {
  readonly commandName: string;
  readonly commandDescription: string;

  protected _subCommandsByName: Map<string, BaseSubCommand>;
  protected readonly _parser: ArgumentsParser;

  protected constructor(opts: ICommandLineInitOption) {
    this.commandName = opts.commandName;
    this.commandDescription = opts.commandDescription;

    this._parser = new ArgumentsParser();
    this._subCommandsByName = new Map<string, BaseSubCommand>();

    /**
     * 通用参数；即使没有SubCommand；这些设置的通用参也需要能有作用；
     */
    this._parser.defineParam({
      shortName: '-V',
      longName: '--version',
      summary: 'Current package version'
    });
  }

  /**
   * 直接添加SubCommand类；
   */
  public defineSubCommand(subCommand: BaseSubCommand): void {
    this._subCommandsByName.set(subCommand.subCommandName, subCommand);
  }
}
