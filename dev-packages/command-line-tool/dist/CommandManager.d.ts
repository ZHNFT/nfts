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
