import { HookBase } from '../classes/HookBase';
import { Logger } from '../classes/Logger';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';
import { Configuration } from '../classes/Configuration';

export const BUILD_START_SUB_HOOK_NAME = 'BUILD_START';

export interface BaseHookContext {
  readonly logger: Logger;
  readonly config: Configuration;
}

export interface BaseBuildHookContext extends BaseHookContext {
  readonly commandLineParameters: BuildCommandLineParametersValue;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildStartSubHookContext extends BaseBuildHookContext {
  readonly finished: BuildFinishedSubHook;
}

export class BuildStartSubHook extends HookBase<BuildStartSubHookContext> {
  constructor() {
    super(BUILD_START_SUB_HOOK_NAME);
  }
}

export const BUILD_COMPILE_SUB_HOOK_NAME = 'BUILD_COMPILE';

export interface BuildCompileSubHookContext extends BaseBuildHookContext {
  readonly hook: {
    run: HookBase<BuildCompileRunSubHookContext>;
    emit: HookBase<BuildCompileEmitSubHookContext>;
    recompile: BuildReCompileSubHook;
  };
}

export class BuildCompileSubHook extends HookBase<BuildCompileSubHookContext> {
  config: Configuration;

  constructor({ config }: { config: Configuration }) {
    super(BUILD_COMPILE_SUB_HOOK_NAME);

    this.config = config;
  }

  // @override
  async call(args: BuildCompileSubHookContext): Promise<void> {
    await super.call(args);

    const runHookContext: BuildCompileRunSubHookContext = {
      config: this.config,
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
export interface BuildCompileRunSubHookContext extends BaseBuildHookContext {
  readonly hook: {
    readonly emit: BuildCompileEmitSubHook;
    readonly recompile: BuildReCompileSubHook;
  };
}

export class BuildCompileRunSubHook extends HookBase<BuildCompileRunSubHookContext> {
  constructor() {
    super(BUILD_COMPILE_RUN_HOOK_NAME);
  }
}

export const BUILD_COMPILE_EMIT_HOOK_NAME = 'BUILD_COMPILE_EMIT';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileEmitSubHookContext extends BaseBuildHookContext {}

export class BuildCompileEmitSubHook extends HookBase<BuildCompileEmitSubHookContext> {
  constructor() {
    super(BUILD_COMPILE_EMIT_HOOK_NAME);
  }
}

export const BUILD_FINISHED_SUB_HOOK_NAME = 'BUILD_FINISHED';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildFinishedSubHookContext extends BaseBuildHookContext {}

export class BuildFinishedSubHook extends HookBase<BuildFinishedSubHookContext> {
  constructor() {
    super(BUILD_FINISHED_SUB_HOOK_NAME);
  }
}

export const BUILD_WATCH_RE_COMPILE_SUB_HOOK_NAME = 'BUILD_COMPILE';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildReCompileSubHookContext extends BaseBuildHookContext {}

export class BuildReCompileSubHook extends HookBase<BuildReCompileSubHookContext> {
  constructor() {
    super(BUILD_WATCH_RE_COMPILE_SUB_HOOK_NAME);
  }
}

export const BUILD_HOOK_NAME = 'BUILD';

export interface BuildHookContext extends BaseBuildHookContext {
  readonly hook: {
    readonly start: BuildStartSubHook;
    readonly compile: BuildCompileSubHook;
    readonly finished: BuildFinishedSubHook;
    readonly recompile: BuildReCompileSubHook;
  };
}

export class BuildHook extends HookBase<BuildHookContext> {
  config: Configuration;

  constructor({ config }: { config: Configuration }) {
    super(BUILD_HOOK_NAME);
    this.config = config;
  }

  public async _call(cliParameterValue?: BuildCommandLineParametersValue): Promise<void> {
    const startHook = new BuildStartSubHook();
    const compileHook = new BuildCompileSubHook({ config: this.config });
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
      logger: Logger.getLogger(BUILD_HOOK_NAME),
      config: this.config
    };

    await super.call(buildHookContext);

    const startHookContext: BuildStartSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_START_SUB_HOOK_NAME),
      finished: buildHookContext.hook.finished,
      config: this.config
    };

    await startHook.call(startHookContext);

    const compileHookContext: BuildCompileSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_COMPILE_SUB_HOOK_NAME),
      hook: {
        run: new BuildCompileRunSubHook(),
        emit: new BuildCompileEmitSubHook(),
        recompile: new BuildReCompileSubHook()
      },
      config: this.config
    };

    await compileHook.call(compileHookContext);

    const finishedHookContext: BuildFinishedSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger(BUILD_FINISHED_SUB_HOOK_NAME),
      config: this.config
    };

    await finishedHook.call(finishedHookContext);
  }
}
