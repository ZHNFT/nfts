import { HookBase } from '../classes/HookBase';
import { Logger } from '../classes/Logger';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';

export const BUILD_START_SUB_HOOK_NAME = 'BUILD_START';

export interface BaseHookContext {
  commandLineParameters: BuildCommandLineParametersValue;
  logger: Logger;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildStartSubHookContext extends BaseHookContext {
  finished: BuildFinishedSubHook;
}

export class BuildStartSubHook extends HookBase<BuildStartSubHookContext> {
  constructor() {
    super(BUILD_START_SUB_HOOK_NAME);
  }
}

export const BUILD_COMPILE_SUB_HOOK_NAME = 'BUILD_COMPILE';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileSubHookContext extends BaseHookContext {
  recompile: BuildReCompileSubHook;
}

export class BuildCompileSubHook extends HookBase<BuildCompileSubHookContext> {
  constructor() {
    super(BUILD_COMPILE_SUB_HOOK_NAME);
  }
}

export const BUILD_FINISHED_SUB_HOOK_NAME = 'BUILD_FINISHED';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildFinishedSubHookContext extends BaseHookContext {}

export class BuildFinishedSubHook extends HookBase<BuildFinishedSubHookContext> {
  constructor() {
    super(BUILD_FINISHED_SUB_HOOK_NAME);
  }
}

export const BUILD_WATCH_RE_COMPILE_SUB_HOOK_NAME = 'BUILD_COMPILE';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildReCompileSubHookContext extends BaseHookContext {}

export class BuildReCompileSubHook extends HookBase<BuildReCompileSubHookContext> {
  constructor() {
    super(BUILD_WATCH_RE_COMPILE_SUB_HOOK_NAME);
  }
}

export const BUILD_HOOK_NAME = 'BUILD';

export interface BuildHookContext extends BaseHookContext {
  start: BuildStartSubHook;
  compile: BuildCompileSubHook;
  finished: BuildFinishedSubHook;
  recompile: BuildReCompileSubHook;
}

export class BuildHook extends HookBase<BuildHookContext> {
  constructor() {
    super(BUILD_HOOK_NAME);
  }

  public async _call(cliParameterValue?: BuildCommandLineParametersValue): Promise<void> {
    const subHookContext: BuildHookContext = {
      start: new BuildStartSubHook(),
      compile: new BuildCompileSubHook(),
      finished: new BuildFinishedSubHook(),
      recompile: new BuildReCompileSubHook(),
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_HOOK_NAME)
    };

    await super.call(subHookContext);

    const startHookContext: BuildStartSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_START_SUB_HOOK_NAME),
      finished: subHookContext.finished
    };

    await subHookContext.start.call(startHookContext);

    const compileHookContext: BuildCompileSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_COMPILE_SUB_HOOK_NAME),
      recompile: subHookContext.recompile
    };

    await subHookContext.compile.call(compileHookContext);

    const finishedHookContext: BuildFinishedSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_FINISHED_SUB_HOOK_NAME)
    };

    await subHookContext.finished.call(finishedHookContext);
  }
}
