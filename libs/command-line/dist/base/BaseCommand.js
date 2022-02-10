/**
 * @desc 使用BaseCommand来构建命令行工具；
 *        Command实现类需要具备一下几种必须属性
 *        - 1
 *        - 2
 *
 * @example
 *
 *
 */
export class BaseCommand {
    constructor(opts) {
        this.commandName = opts.commandName;
        this.commandDescription = opts.commandDescription;
        this._subCommandsByName = new Map();
    }
    /**
     * 直接添加SubCommand类；
     */
    defineSubCommand(subCommand) {
        this._subCommandsByName.set(subCommand.subCommandName, subCommand);
    }
}
