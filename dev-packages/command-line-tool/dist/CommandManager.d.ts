/**
 * @public
 *
 * @class 命令注册的相关信息
 */
declare class CommandOptions {
    readonly optionName: string;
    readonly shortOptionName?: string;
    readonly description?: string;
}
/**
 * @public
 *
 * @example
 * const cmd = new CommandManager({ name: 'adv', description: 'adv description' });
 *
 */
export default class CommandManager {
    private readonly commandName;
    private readonly commandDescription;
    constructor({ name, description }: {
        name: string;
        description: string;
    });
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
    registerSubCommand(subCommandName: string, options: CommandOptions[]): void;
}
export {};
