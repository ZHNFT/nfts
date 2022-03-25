import { Hook } from '@nfts/hook';
export interface CycleInitOption {
  name: string;
}

export type CommonPhases = 'pre' | 'compile' | 'emit' | 'finished' | 'error';

/*
 * 插件的注册
 * */
export abstract class Lifecycle<HookNames = string, HookContext = unknown> extends Hook<
  HookNames,
  HookContext
> {}
