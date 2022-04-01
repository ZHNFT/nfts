import { HookBase, THookNames } from '../classes/HookBase';

export type BuildHookNames = THookNames;

export class BuildHook extends HookBase<BuildHookNames> {
  constructor() {
    super();
  }
}
