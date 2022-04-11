import { HookBase } from '../classes/HookBase';

export const BUILD_START_SUB_HOOK_NAME = 'BUILD_START';

export class BuildStartSubHook extends HookBase<BuildHookOptions> {
  constructor() {
    super(BUILD_START_SUB_HOOK_NAME);
  }
}

export const BUILD_COMPILE_SUB_HOOK_NAME = 'BUILD_COMPILE';

export class BuildCompileSubHook extends HookBase<BuildHookOptions> {
  constructor() {
    super(BUILD_COMPILE_SUB_HOOK_NAME);
  }
}

export const BUILD_FINISHED_SUB_HOOK_NAME = 'BUILD_FINISHED';

export class BuildFinishedSubHook extends HookBase<BuildHookOptions> {
  constructor() {
    super(BUILD_FINISHED_SUB_HOOK_NAME);
  }
}

export interface BuildHookOptions {
  cleanDist?: boolean;
  runTest?: boolean;
}

export const BUILD_HOOK_NAME = 'BUILD';

export interface BuildHookContext {
  start: BuildStartSubHook;
  compile: BuildCompileSubHook;
  finished: BuildFinishedSubHook;
  commandLineParameters: BuildHookOptions;
}

export class BuildHook extends HookBase<BuildHookContext> {
  constructor() {
    super(BUILD_HOOK_NAME);
  }

  public async _call(options?: BuildHookOptions): Promise<void> {
    const subHookContext: BuildHookContext = {
      commandLineParameters: options,
      start: new BuildStartSubHook(),
      compile: new BuildCompileSubHook(),
      finished: new BuildFinishedSubHook()
    };

    await super.call(subHookContext);
  }
}
