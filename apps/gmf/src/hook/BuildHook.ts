import { HookBase } from '../classes/HookBase';

export type BuildHookNames = 'clean' | 'config' | 'build' | 'emit' | 'finished';

/*
 * 在这个Hook里面增加一些不同执行阶段的Hooks，
 * 为每个独立的阶段设置一个Hook，增强拓展能力；
 * */
export class BuildHook extends HookBase<BuildHookNames> {
  constructor() {
    super();
  }
}
