import { Hook } from '@ntfs/hook';
import Config from '../core/Config';

export interface CycleInitOption {
  config: Config;
}

/*
 * 继承 Hook，实现插件的注册和执行工作
 * */
export abstract class BaseCycle<HookNames = string, HookContext = unknown> extends Hook<
  HookNames,
  HookContext
> {
  public readonly hook: Hook<HookNames, HookContext> = new Hook<HookNames, HookContext>();
}
