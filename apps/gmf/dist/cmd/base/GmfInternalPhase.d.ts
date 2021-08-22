import { GmfConfiguration } from './GmfConfiguration';
import { Logger, TerminalProvider } from '@raydium/command-line-tool';
import { GmfContext } from './GmfContext';
import { GmfAction } from './GmfAction';
export interface IGmfInternalPhaseInitOptions {
    gmfConfig: GmfConfiguration;
    gmfLog: Logger;
    gmfTerminal: TerminalProvider;
}
export declare class GmfInternalPhase {
    gmfConfig: GmfConfiguration;
    gmfTerminal: TerminalProvider;
    gmfLogger: Logger;
    gmfPluginContext: GmfContext;
    actions: GmfAction[];
    actionByName: Map<string, GmfAction>;
    constructor({ gmfConfig, gmfLog, gmfTerminal }: IGmfInternalPhaseInitOptions);
    /**
     * @internal
     */
    registerAction(action: GmfAction): void;
    /**
     *
     */
    getActionByName(name: string): GmfAction | undefined;
}
