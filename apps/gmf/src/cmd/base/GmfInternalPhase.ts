import { SyncHook } from 'tapable';
import { GmfConfiguration } from './GmfConfiguration';
import { Logger, TerminalProvider } from '@raydium/command-line-tool';
import { GmfContext } from './GmfContext';
import { GmfAction } from './GmfAction';

export interface IGmfInternalPhaseInitOptions {
  gmfConfig: GmfConfiguration;
  gmfLog: Logger;
  gmfTerminal: TerminalProvider;
}

export class GmfInternalPhase {
  gmfConfig: GmfConfiguration;
  gmfTerminal: TerminalProvider;
  gmfLogger: Logger;

  gmfPluginContext: GmfContext;

  actions: GmfAction[];
  actionByName: Map<string, GmfAction> = new Map();

  constructor({
    gmfConfig,
    gmfLog,
    gmfTerminal
  }: IGmfInternalPhaseInitOptions) {
    this.gmfConfig = gmfConfig;
    this.gmfLogger = gmfLog;
    this.gmfTerminal = gmfTerminal;

    this.gmfPluginContext = {
      hooks: {
        esm: new SyncHook<GmfContext>(),
        test: new SyncHook<GmfContext>(),
        build: new SyncHook<GmfContext>(),
        release: new SyncHook<GmfContext>()
      },
      addAction: (action: GmfAction) => {
        this.registerAction(action);
      }
    };
  }

  /**
   * @internal
   */
  registerAction(action: GmfAction): void {
    this.actions.push(action);
    this.actionByName.set(action.name, action);
  }

  /**
   * @internal
   */
  getActionByName(name: string): GmfAction | undefined {
    return this.actionByName.get(name);
  }
}
