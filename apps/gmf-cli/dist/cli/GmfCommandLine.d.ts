import { CommandLineTool } from '@gmf/node-command-line';
import { PluginManager } from './framework/PluginManager';
export declare class GmfCommandLine extends CommandLineTool {
    _pluginManager: PluginManager;
    constructor();
    prepare(): GmfCommandLine;
    exec(): Promise<void>;
}
