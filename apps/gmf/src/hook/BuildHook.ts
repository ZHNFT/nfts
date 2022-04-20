import { AsyncHook } from '@nfts/hook';
import { Logger } from '../classes/Logger';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';
import { Configuration } from '../classes/Configuration';

export interface BaseHookContext {
  readonly logger: Logger;
  readonly config: Configuration;
}

export interface BaseBuildHookContext extends BaseHookContext {
  readonly commandLineParameters: BuildCommandLineParametersValue;
}

export interface BuildStartSubHookContext extends BaseBuildHookContext {
  readonly finished: BuildFinishedSubHook;
}

export class BuildStartSubHook extends AsyncHook<BuildStartSubHookContext> {}

export interface BuildCompileSubHookContext extends BaseBuildHookContext {
  readonly hook: {
    run: AsyncHook<BuildCompileRunSubHookContext>;
    emit: AsyncHook<BuildCompileEmitSubHookContext>;
    recompile: BuildReCompileSubHook;
  };
}

export class BuildCompileSubHook extends AsyncHook<BuildCompileSubHookContext> {
  config: Configuration;

  constructor({ config }: { config: Configuration }) {
    super();
    this.config = config;
  }

  // @override
  async call(args: BuildCompileSubHookContext): Promise<void> {
    await super.emit(args);

    const runHookContext: BuildCompileRunSubHookContext = {
      config: this.config,
      commandLineParameters: args.commandLineParameters,
      logger: args.logger,
      hook: {
        emit: args.hook.emit,
        recompile: args.hook.recompile
      }
    };

    await args.hook.run.emit(runHookContext);
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileRunSubHookContext extends BaseBuildHookContext {
  readonly hook: {
    readonly emit: BuildCompileEmitSubHook;
    readonly recompile: BuildReCompileSubHook;
  };
}

export class BuildCompileRunSubHook extends AsyncHook<BuildCompileRunSubHookContext> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileEmitSubHookContext extends BaseBuildHookContext {}

export class BuildCompileEmitSubHook extends AsyncHook<BuildCompileEmitSubHookContext> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildFinishedSubHookContext extends BaseBuildHookContext {}

export class BuildFinishedSubHook extends AsyncHook<BuildFinishedSubHookContext> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildReCompileSubHookContext extends BaseBuildHookContext {}

export class BuildReCompileSubHook extends AsyncHook<BuildReCompileSubHookContext> {}

export interface BuildHookContext extends BaseBuildHookContext {
  readonly hook: {
    readonly start: BuildStartSubHook;
    readonly compile: BuildCompileSubHook;
    readonly finished: BuildFinishedSubHook;
    readonly recompile: BuildReCompileSubHook;
  };
}

export class BuildHook extends AsyncHook<BuildHookContext> {
  config: Configuration;

  constructor({ config }: { config: Configuration }) {
    super();
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
      logger: Logger.getLogger('BuildHook'),
      config: this.config
    };

    await super.emit(buildHookContext);

    const startHookContext: BuildStartSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger('BuildHookStart'),
      finished: buildHookContext.hook.finished,
      config: this.config
    };

    await startHook.emit(startHookContext);

    const compileHookContext: BuildCompileSubHookContext = {
      commandLineParameters: cliParameterValue,
      logger: Logger.getLogger('Compile'),
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
      logger: Logger.getLogger('BuildHookFinished'),
      config: this.config
    };

    await finishedHook.emit(finishedHookContext);
  }
}
