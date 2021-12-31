import { ArgumentsParser } from '@ntfs/node-arg-parser';
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
export class BaseCommand {
    constructor(opts) {
        this.commandName = opts.commandName;
        this.commandDescription = opts.commandDescription;
        /**
         * 参数解析
         */
        this._parser = new ArgumentsParser();
    }
    defineSubCommand(subCommand) {
        const { subCommandName, subCommandDescription, parser } = subCommand;
        if (this._subCommandsByName.has(subCommandName)) {
            // @todo Warning
            console.warn(`Sub command: ${subCommandName} has already defined, and will will skip this one`);
        }
        else {
            this._subCommandsByName.set(subCommand.subCommandName, subCommand);
        }
    }
}
