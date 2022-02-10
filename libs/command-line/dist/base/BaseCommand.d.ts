import { BaseSubCommand } from './BaseSubCommand';
export interface ICommandLineInitOption {
    commandName: string;
    commandDescription: string;
}
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
export declare class BaseCommand implements ICommandLineInitOption {
    readonly commandName: string;
    readonly commandDescription: string;
    protected readonly _subCommandsByName: Map<string, BaseSubCommand>;
    protected constructor(opts: ICommandLineInitOption);
    /**
     * 直接添加SubCommand类；
     */
    defineSubCommand(subCommand: BaseSubCommand): void;
}
