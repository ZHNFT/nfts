import { BaseSubCommand } from '@ntfs/command-line';
import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { MonoPackagesConfig } from '../base/MonoPackagesConfig';
import { BasePackagesManager } from '../base/BasePackagesManager';
export declare class InstallSubCommand extends BaseSubCommand {
    private _config;
    private _manager;
    constructor({ parser, config, manager }: {
        parser: ArgumentsParser;
        config: MonoPackagesConfig;
        manager: BasePackagesManager;
    });
    onParametersDefine(): void;
    apply(): Promise<void>;
    initialize<T extends unknown>(args?: T): BaseSubCommand;
}
