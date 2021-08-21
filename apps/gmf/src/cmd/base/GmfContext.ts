/**
 * @public
 *
 * @description plugin执行时候的上下文对象
 */
import { SyncHook } from 'tapable';
import { GmfAction } from './GmfAction';
import { GmfConfiguration } from './GmfConfiguration';
import { Logger, TerminalProvider } from '@raydium/command-line-tool';

/**
 * @internal 提供给插件使用的hooks对象
 */
interface IGmfContextHooks {
  esm: SyncHook<GmfContext>;
  test: SyncHook<GmfContext>;
  build: SyncHook<GmfContext>;
  release: SyncHook<GmfContext>;
}

/**
 * @internal
 */
export interface GmfInitContextOptions {
  config: GmfConfiguration;
  terminal: TerminalProvider;
  logger: Logger;

  // actions
  esm: GmfAction;
}

/**
 * @internal
 */
export abstract class GmfContext {
  /**
   * @public
   */
  hooks: IGmfContextHooks;

  protected constructor(initOptions: GmfInitContextOptions) {
    //
  }

  /**
   * @public
   * @param actionName
   * @param action
   */
  abstract addAction(action: GmfAction): void;
}
