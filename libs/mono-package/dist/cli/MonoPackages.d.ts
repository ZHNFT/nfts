import { CommandLineToolDefinition } from '@ntfs/command-line';
export declare class MonoPackages extends CommandLineToolDefinition {
    private _config;
    constructor();
    prepare(): this;
    exec(): Promise<void>;
    private _readConfigFromCommandLine;
}
