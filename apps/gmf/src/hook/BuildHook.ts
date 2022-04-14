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

export interface BuildCompileSubHookContext extends BaseHookContext {
  hook: {
    run: HookBase<BuildCompileRunSubHookContext>;
    emit: HookBase<BuildCompileEmitSubHookContext>;
    recompile: BuildReCompileSubHook;
  };
}

export class BuildCompileSubHook extends HookBase<BuildCompileSubHookContext> {
  constructor() {
    super(BUILD_COMPILE_SUB_HOOK_NAME);
  }

  // @override
  async call(args: BuildCompileSubHookContext): Promise<void> {
    await super.call(args);

    const runHookContext: BuildCompileRunSubHookContext = {
      commandLineParameters: args.commandLineParameters,
      logger: args.logger,
      hook: {
        emit: args.hook.emit,
        recompile: args.hook.recompile
      }
    };

    await args.hook.run.call(runHookContext);
  }
}

export const BUILD_COMPILE_RUN_HOOK_NAME = 'BUILD_COMPILE_RUN';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileRunSubHookContext extends BaseHookContext {
  hook: {
    emit: BuildCompileEmitSubHook;
    recompile: BuildReCompileSubHook;
  };
}

export class BuildCompileRunSubHook extends HookBase<BuildCompileRunSubHookContext> {
  constructor() {
    super(BUILD_COMPILE_RUN_HOOK_NAME);
  }
}

export const BUILD_COMPILE_EMIT_HOOK_NAME = 'BUILD_COMPILE_EMIT';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileEmitSubHookContext extends BaseHookContext {}

export class BuildCompileEmitSubHook extends HookBase<BuildCompileEmitSubHookContext> {
  constructor() {
    super(BUILD_COMPILE_EMIT_HOOK_NAME);
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
  hook: {
    start: BuildStartSubHook;
    compile: BuildCompileSubHook;
    finished: BuildFinishedSubHook;
    recompile: BuildReCompileSubHook;
  };
}

export class BuildHook extends HookBase<BuildHookContext> {
  constructor() {
    super(BUILD_HOOK_NAME);
  }

  public async _call(cliParameterValue?: BuildCommandLineParametersValue): Promise<void> {
    const startHook = new BuildStartSubHook();
    const compileHook = new BuildCompileSubHook();
    const finishedHook = new BuildFinishedSubHook();
    const recompileHook = new BuildReCompileSubHook();

    const buildHookContext: BuildHookContext = {
      hook: {
        start: startHook,
        compile: compileHook,
        finished: finishedHook,
        recompile: recompileHook
      },
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_HOOK_NAME)
    };

    await super.call(buildHookContext);

    const startHookContext: BuildStartSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_START_SUB_HOOK_NAME),
      finished: buildHookContext.hook.finished
    };

    await startHook.call(startHookContext);

    const compileHookContext: BuildCompileSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_COMPILE_SUB_HOOK_NAME),
      hook: {
        run: new BuildCompileRunSubHook(),
        emit: new BuildCompileEmitSubHook(),
        recompile: new BuildReCompileSubHook()
      }
    };

    await compileHook.call(compileHookContext);

    const finishedHookContext: BuildFinishedSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_FINISHED_SUB_HOOK_NAME)
    };

    await finishedHook.call(finishedHookContext);
  }
}
