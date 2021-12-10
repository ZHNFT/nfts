export declare type ActionFunc<T> = (args: T) => void;
export declare abstract class ICommandAction<T> {
    name: string;
    description: string;
    hooks: Record<string, () => void[]>;
    abstract applyAction(ctx: T): void;
}
export declare class CommandAction<T> implements ICommandAction<T> {
    name: string;
    description: string;
    hooks: Record<string, () => void[]>;
    constructor({ actionName, actionDescription }: {
        actionName: string;
        actionDescription: string;
    });
    applyAction(ctx: T): void;
}
