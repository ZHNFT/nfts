/**
 * @public
 *
 * @class 命令注册的相关信息
 */
class CommandOptions {
  public readonly optionName!: string;
  public readonly shortOptionName?: string;
  public readonly description?: string;
}

/**
 * @public
 *
 * @example
 * const cmd = new CommandManager({ name: 'adv', description: 'adv description' });
 *
 */
export default class CommandManager {
  private readonly commandName: string;
  private readonly commandDescription: string;

  constructor({ name, description }: { name: string; description: string }) {
    this.commandName = name;
    this.commandDescription = description;
  }

  /**
   *
   * @public
   * @param subCommandName
   * @param options
   *
   * @example
   * CommandManager.registerSubCommand(subCommandName, [
   *  {
   *    optionName: 'run-dry',
   *    shortOptionName: 'd',
   *    description: 'Will run command without limitation'
   *  },
   *  ...
   * ])
   */
  registerSubCommand(subCommandName: string, options: CommandOptions[]): void {
    /// 注册子命令的信息
    console.log(subCommandName, options);
  }
}
