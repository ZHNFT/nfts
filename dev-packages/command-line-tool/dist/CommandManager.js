/**
 * @public
 *
 * @class 命令注册的相关信息
 */
class CommandOptions {
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
    registerSubCommand(subCommandName, options) {
        /// 注册子命令的信息
        console.log(subCommandName, options);
    }
}
