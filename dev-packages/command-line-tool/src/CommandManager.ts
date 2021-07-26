class CommandOptions {
  public readonly optionName!: string;
  public readonly shortOptionName?: string;
  public readonly description?: string;
}

/**
 * @public
 *
 * @example
 * const cmd = new CommandManager();
 *
 */
export default class CommandManager {
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
