import { Hook } from '@nfts/hook';

export type THookNames = 'pre' | 'run' | 'finished';

/*
 * 插件的注册
 * */
export abstract class HookBase<HookNames = string, HookContext = unknown> extends Hook<
  HookNames,
  HookContext
> {}
