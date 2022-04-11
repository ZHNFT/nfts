import { HookBase } from '../classes/HookBase';
import { Logger } from '../classes/Logger';

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
  logger: Logger;
}

export class BuildHook extends HookBase<BuildHookContext> {
  constructor() {
    super(BUILD_HOOK_NAME);
  }

  public async _call(options?: BuildHookOptions): Promise<void> {
    const subHookContext: BuildHookContext = {
      start: new BuildStartSubHook(),
      compile: new BuildCompileSubHook(),
      finished: new BuildFinishedSubHook(),
      commandLineParameters: options,
      logger: Logger.getLogger(BUILD_HOOK_NAME)
    };

    await super.call(subHookContext);

    await subHookContext.start.call();
    await subHookContext.compile.call();
    await subHookContext.finished.call();
  }
}
