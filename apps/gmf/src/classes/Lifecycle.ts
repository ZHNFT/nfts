import { Hook } from '@nfts/hook';
import { PluginContext } from './Plugin';

export type CommonPhases = 'pre' | 'run' | 'finished';

/*
 * 插件的注册
 * */
export abstract class Lifecycle<
  HookNames = string,
  HookContext = PluginContext
> extends Hook<HookNames, HookContext> {}
