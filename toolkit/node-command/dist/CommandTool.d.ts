import { ICommand } from './Command';
export interface ICommandTool {
    toolName: string;
    toolDescription: string;
    addCommand(commandName: any, command: ICommand<unknown>): Map<string, ICommand<unknown>>;
    getCommand(commandName: string): ICommand<unknown>;
}
export declare class CommandTool implements ICommandTool {
    toolName: string;
    toolDescription: string;
    commands: Map<string, ICommand<unknown>>;
    constructor();
    addCommand: (commandName: string, command: ICommand<unknown>) => Map<string, ICommand<unknown>>;
    getCommand: (name: string) => ICommand<unknown>;
}
