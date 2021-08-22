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
export interface IGmfContextHooks {
  [THookName: string]: SyncHook<GmfContext>;
}

/**
 * @internal
 */
export interface GmfContextInitOptions {
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

  /**
   * @public
   * @param action
   */
  abstract addAction(action: GmfAction): void;
}
