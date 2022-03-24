import { Hook } from '@ntfs/hook';
export interface CycleInitOption {
  name: string;
}

export type CommonPhases = 'pre' | 'compile' | 'emit' | 'finished' | 'error';

/*
 * 插件的注册
 * */
export abstract class BaseCycle<HookNames = string, HookContext = unknown> extends Hook<
  HookNames,
  HookContext
> {
  public readonly hook: Hook<HookNames, HookContext> = new Hook<HookNames, HookContext>();
}
