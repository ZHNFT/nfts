import { ICommandAction } from './CommandAction';
export declare type IActionConfig = {
    name: string;
};
export interface ICommand<T> {
    readonly commandName: string;
    readonly commandActions: Map<string, ICommandAction<T>>;
    addAction(action: ICommandAction<T>): void;
    getAction(actionName: string): ICommandAction<T>;
}
export declare class Command<T> implements ICommand<T> {
    commandName: string;
    commandDescription: string;
    commandActions: Map<string, ICommandAction<T>>;
    constructor({ commandName, commandDescription }: {
        commandName: string;
        commandDescription: string;
    });
    getAction(actionName: string): ICommandAction<T>;
    addAction(action: ICommandAction<T>): void;
}
