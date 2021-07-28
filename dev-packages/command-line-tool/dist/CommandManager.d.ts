declare class CommandOptions {
  readonly optionName: string;
  readonly shortOptionName?: string;
  readonly description?: string;
}
/**
 * @public
 *
 * @example ```ts
 * const cmd = new CommandManager();
 * ```
 */
export default class CommandManager {
  _commandName: string;
  _commandDescription: string;

  constructor({ commandName, commandDescription }) {
    this._commandName = commandName;
    this._commandDescription = commandDescription;
  }
  /**
   * @public
   *
   * @description 指令名称
   */
  get commandName() {
    return this._commandName;
  }

  /**
   * @public
   *
   * @description 指令描述
   */
  get commandDescription() {
    return this._commandDescription;
  }

  /**
   *
   * @public
   * @param subCommandName
   * @param options
   *
   * @example  ```ts
   * CommandManager.registerSubCommand(subCommandName, [
   *  {
   *    optionName: 'run-dry',
   *    shortOptionName: 'd',
   *    description: 'Will run command without limitation'
   *  }
   * ])
   * ```
   */
  registerSubCommand(subCommandName: string, options: CommandOptions[]): void;
}
export {};
