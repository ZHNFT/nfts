export declare type ActionFunc<T> = (args: T) => void;
export interface ICommandAction<T> {
    name: string;
    action: ActionFunc<T>;
    applyAction(ctx: T): void;
}
export declare class CommandAction<T> implements ICommandAction<T> {
    name: string;
    action: ActionFunc<T>;
    constructor(name: string, action: ActionFunc<T>);
    applyAction(ctx: T): void;
}
