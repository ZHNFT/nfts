import { ArgumentsParser } from '@ntfs/node-arg-parser';
export interface ISubCommandLineInitOption {
    /**
     * 子命令名称；
     */
    readonly subCommandName: string;
    /**
     * 子命令描述；
     */
    readonly subCommandDescription: string;
    readonly parser: ArgumentsParser;
}
export interface IBaseSubCommand {
}
export declare abstract class BaseSubCommand implements IBaseSubCommand {
    readonly subCommandName: string;
    readonly subCommandDescription: string;
    protected readonly parser: ArgumentsParser;
    protected constructor({ subCommandName, subCommandDescription, parser }: ISubCommandLineInitOption);
    /**
     * 主要的执行方法
     * @method apply
     * @return {Promise<void>} [description]
     */
    abstract apply(): Promise<void>;
    /**
     * 初始化子命令
     * @type {[type]}
     */
    abstract initialize<T>(args?: T): IBaseSubCommand;
    /**
     * 在该方法中定义命令行参数
     * @method onParametersDefine
     */
    abstract onParametersDefine(): void;
}
