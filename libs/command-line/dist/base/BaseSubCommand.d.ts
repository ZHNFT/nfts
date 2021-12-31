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
    private readonly parser;
    protected constructor({ subCommandName, subCommandDescription, parser }: ISubCommandLineInitOption);
    abstract apply(): Promise<void>;
    abstract initialize(): IBaseSubCommand;
}
