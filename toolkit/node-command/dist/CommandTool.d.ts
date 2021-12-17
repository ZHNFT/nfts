import { ArgsResult as IArgsResult } from '@nfts/node-args';
import { ICommand } from './Command';
export declare abstract class ICommandTool {
    toolName: string;
    toolDescription: string;
    abstract addCommand(commandName: string, command: ICommand<unknown>): Map<string, ICommand<unknown>>;
    abstract getCommand(commandName: string): ICommand<unknown>;
    commandLineArgumentsParser(): IArgsResult;
}
export declare class CommandTool extends ICommandTool {
    toolName: string;
    toolDescription: string;
    commands: Map<string, ICommand<unknown>>;
    rawArgs: string[];
    argsParseResult: IArgsResult;
    constructor();
    addCommand: (commandName: string, command: ICommand<unknown>) => Map<string, ICommand<unknown>>;
    getCommand: (name: string) => ICommand<unknown>;
}
