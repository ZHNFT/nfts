import { HookBase } from '../classes/HookBase';

export type BuildHookNames = 'phase:config' | 'phase:build' | 'phase:finished';

export class BuildHook extends HookBase<BuildHookNames> {
  constructor() {
    super();
  }
}
