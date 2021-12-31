import { BaseSubCommand } from '@ntfs/command-line';
import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { MonoPackageConfig } from '../base/MonoPackageConfig';
export declare class InstallSubCommand extends BaseSubCommand {
    config: MonoPackageConfig;
    constructor({ parser, config }: {
        parser: ArgumentsParser;
        config: MonoPackageConfig;
    });
    initialize(): BaseSubCommand;
    apply(): Promise<void>;
}
