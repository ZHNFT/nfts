export declare type ActionFunc<T> = (args: T) => void;
export declare abstract class ICommandAction<T> {
    readonly actionName: string;
    readonly actionDescription: string;
    readonly actionApplyHook: string;
    readonly actionOptions?: unknown;
    private readonly _apply;
    get apply(): unknown;
    set apply(_: unknown);
    constructor({ actionName, actionDescription, actionApplyHook, actionOptions }: {
        actionName: string;
        actionDescription: string;
        actionApplyHook: string;
        actionOptions?: unknown;
    });
    /**
     * @description 通过 actionName 来引入action函数逻辑
     */
    private _initAction;
}
export declare class CommandAction<T> extends ICommandAction<T> {
    constructor({ actionName, actionDescription, actionApplyHook, actionOptions }: {
        actionName: string;
        actionDescription: string;
        actionApplyHook: string;
        actionOptions?: unknown;
    });
}
