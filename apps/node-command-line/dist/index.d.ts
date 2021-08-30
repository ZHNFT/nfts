import { SyncHook } from 'tapable';
export declare class PluginContext {
}
export declare class PluginMgmt {
    hook: SyncHook<PluginContext>;
    initializePlugins(): SyncHook<PluginContext, void, import("tapable").UnsetAdditionalOptions>;
}
export declare class ActionBase {
    #private;
    constructor({ name }: {
        name: string;
    });
    get name(): string;
    get plugins(): PluginMgmt;
}
export declare class NodeCommandLine {
    toolName: string;
    toolDescription: string;
    actions: ActionBase[];
    actionsByName: Record<string, ActionBase>;
    constructor({ toolName, toolDescription }: {
        toolName: string;
        toolDescription: string;
    });
    getActionByName(actionName: string): ActionBase | undefined;
}
declare type CLICommandNames = {
    _: string[];
};
declare type CLICommandOptions = Record<string, string | boolean>;
export declare type CLICommandParsedArgs = CLICommandNames & CLICommandOptions;
export declare const argsParser: <T extends CLICommandOptions>(args: string[]) => {
    _: string[];
} & T;
export {};
