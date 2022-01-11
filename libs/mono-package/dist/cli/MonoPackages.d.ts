import { CommandLineToolDefinition } from '@ntfs/command-line';
import { BasePackagesManager } from '../base/BasePackagesManager';
export interface IInitialContext {
    readonly manager: BasePackagesManager;
}
export declare class MonoPackages extends CommandLineToolDefinition {
    private _config;
    constructor();
    prepare(): this;
    exec(): Promise<void>;
    private _readConfigFromCommandLine;
}
