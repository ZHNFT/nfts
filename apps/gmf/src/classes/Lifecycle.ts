import { Hook } from '@nfts/hook';
import { PluginContext } from '../core/Plugin';

export type CommonPhases = 'pre' | 'compile' | 'emit' | 'finished' | 'error';

/*
 * 插件的注册
 * */
export abstract class Lifecycle<
  HookNames = string,
  HookContext = PluginContext
> extends Hook<HookNames, HookContext> {}
