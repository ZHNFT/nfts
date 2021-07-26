class CommandOptions {
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
    registerSubCommand(subCommandName, options) {
        /// 注册子命令的信息
        console.log(subCommandName, options);
    }
}
