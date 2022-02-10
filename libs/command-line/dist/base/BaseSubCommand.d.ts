import { Parser } from '@ntfs/node-arg-parser';
export interface ISubCommandLineInitOption {
    readonly subCommandName: string;
    readonly subCommandDescription: string;
    readonly parser: Parser;
}
export interface IBaseSubCommand {
    readonly subCommandName: string;
    readonly subCommandDescription: string;
}
export declare abstract class BaseSubCommand implements IBaseSubCommand {
    readonly subCommandName: string;
    readonly subCommandDescription: string;
    protected readonly parser: Parser;
    protected constructor({ subCommandName, subCommandDescription, parser }: ISubCommandLineInitOption);
    /**
     * 主要的执行方法
     * @method apply
     * @return {Promise<void>} [description]
     */
    abstract apply(): Promise<void>;
    /**
     * 在该方法中定义命令行参数
     * @method onParametersDefine
     */
    abstract onParametersDefine(parser: Parser): void;
}
