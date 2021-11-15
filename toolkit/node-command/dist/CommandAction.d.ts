export interface ICommandAction<T> {
    name: string;
    action: Function;
    applyAction(ctx: T): void;
}
export declare class CommandAction<T> implements ICommandAction<T> {
    name: string;
    action: Function;
    constructor(name: string, action: Function);
    applyAction(ctx: T): void;
}
