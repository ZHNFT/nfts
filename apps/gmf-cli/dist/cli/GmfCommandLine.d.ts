import { CommandLineTool } from '@gmf/node-command-line';
import { GmfConfig } from './framework/GmfConfig';
import { PluginManager } from './framework/PluginManager';
import { Logger } from './framework/Logger';
export declare class GmfCommandLine extends CommandLineTool {
    readonly _pluginManager: PluginManager;
    readonly _logger: Logger;
    readonly _config: GmfConfig;
    constructor();
    prepare(): GmfCommandLine;
    exec(): Promise<void>;
}
