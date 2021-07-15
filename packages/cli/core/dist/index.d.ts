/// <reference types="node" />

import { EventEmitter } from 'events';

declare class Command extends EventEmitter {
    readonly name: string;
    readonly version: string;
    readonly logs: {
        time: string;
        message: string;
        level: keyof typeof LogLevel;
    }[];
    readonly commandPackage: Package | undefined;
    readonly options: CommandArgs | undefined;
    constructor({ name, version, options, }: {
        readonly name: string;
        readonly version: string;
        readonly options: CommandArgs;
    });
    run(execute: CommandImpl): Promise<void>;
    log(message: string, level: ILogLevel): void;
}

declare interface CommandArgs {
    scope?: string;
    [prop: string]: string | undefined;
}

export declare type CommandImpl = (cmd: Command) => void | Promise<void>;

declare interface CoreOpts {
    command: string;
    options: CommandArgs;
}

declare const _default: ({ command, options }: CoreOpts) => Promise<void>;
export default _default;

declare type ILogLevel = keyof typeof LogLevel;

declare enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}

export declare class Package {
    root: string;
    dirs: string[];
    json: {
        [prop: string]: unknown;
    };
    constructor(root?: string);
}

declare class Plugin_2 extends EventEmitter {
    readonly version: string;
    readonly name: string;
    readonly methods: PluginMethods;
    constructor({ name, version, methods, }: {
        name: string;
        version: string;
        methods: PluginMethods;
    });
    /**
     * Plugin的执行方法
     * */
    run(api: Package, cmd: Command, options?: CommandArgs): Promise<void>;
}
export { Plugin_2 as Plugin }

declare type PluginFunc = <T>(api: Package) => Promise<T>;

export declare type PluginImpl = (api: Package, options?: CommandArgs) => Promise<void>;

declare type PluginMethods = {
    [name: string]: PluginFunc;
};

export { }
