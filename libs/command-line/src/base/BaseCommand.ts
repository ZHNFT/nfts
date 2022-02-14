import { BaseSubCommand } from './BaseSubCommand';

export interface ICommandLineInitOption {
  commandName: string;
  commandDescription: string;
}

export class BaseCommand implements ICommandLineInitOption {
  readonly commandName: string;
  readonly commandDescription: string;

  protected readonly _subCommandsByName: Map<string, BaseSubCommand>;

  protected constructor(opts: ICommandLineInitOption) {
    this.commandName = opts.commandName;
    this.commandDescription = opts.commandDescription;

    this._subCommandsByName = new Map<string, BaseSubCommand>();
  }

  /**
   * 直接添加SubCommand类；
   */
  public defineSubCommand(subCommand: BaseSubCommand): void {
    this._subCommandsByName.set(subCommand.subCommandName, subCommand);
  }
}
