import { ICommandAction } from './CommandAction';
export declare type IActionConfig = {
    name: string;
};
export declare abstract class ICommand<T> {
    readonly commandName: string;
    readonly commandActions: Map<string, ICommandAction<T>>;
    abstract addAction(action: ICommandAction<T>): void;
    abstract getAction(actionName: string): ICommandAction<T> | undefined;
    /**
     * @description 触发操作
     * */
    abstract invokeAction(): void;
}
export declare class Command<T> implements ICommand<T> {
    commandName: string;
    commandDescription: string;
    commandActions: Map<string, ICommandAction<T>>;
    constructor({ commandName, commandDescription }: {
        commandName: string;
        commandDescription: string;
    });
    getAction(actionName: string): ICommandAction<T> | undefined;
    addAction(action: ICommandAction<T>): void;
    invokeAction(): void;
}
