import { AsyncHook } from '@nfts/hook';
import { DebugTool } from '@nfts/noddy';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';
import { Configuration } from '../classes/Configuration';
import { getScopedLogger } from '../utils/getScopeLogger';

export interface HookContextBase {
  readonly getScopedLogger: (scope: string) => DebugTool.Debug;
  readonly config: Configuration;
}

export interface BuildHookContextBase extends HookContextBase {
  readonly commandLineParameters: BuildCommandLineParametersValue;
}

export interface BuildCompileSubHookContext extends BuildHookContextBase {
  // Compile 阶段所有的子 hook
  readonly hook: {
    run: BuildCompileRunSubHook;
    emit: BuildCompileEmitSubHook;
    test: BuildCompileTestSubHook;
    recompile: BuildCompileReStartSubHook;
  };
}

export class BuildCompileSubHook extends AsyncHook<BuildCompileSubHookContext> {
  config: Configuration;

  constructor({ config }: { config: Configuration }) {
    super();
    this.config = config;
  }

  /**
   * @override
   **/
  async call(args: BuildCompileSubHookContext): Promise<void> {
    await super.emit(args);

    const runHookContext: BuildCompileRunSubHookContext = {
      config: this.config,
      commandLineParameters: args.commandLineParameters,
      getScopedLogger,
      hook: {
        test: args.hook.test,
        emit: args.hook.emit,
        recompile: args.hook.recompile
      }
    };

    await args.hook.run.emit(runHookContext);
  }
}

export interface BuildCompileRunSubHookContext extends BuildHookContextBase {
  readonly hook: {
    readonly test: BuildCompileTestSubHook;
    readonly emit: BuildCompileEmitSubHook;
    readonly recompile: BuildCompileReStartSubHook;
  };
}

export class BuildCompileRunSubHook extends AsyncHook<BuildCompileRunSubHookContext> {
  // Compile RUN sub-hook
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileEmitSubHookContext extends BuildHookContextBase {}

export class BuildCompileEmitSubHook extends AsyncHook<BuildCompileEmitSubHookContext> {
  // Compile EMIT sub-hook
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileReStartSubHookContext extends BuildHookContextBase {}

export class BuildCompileReStartSubHook extends AsyncHook<BuildCompileReStartSubHookContext> {
  // Compile RECOMPILE sub-hook
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuildCompileTestSubHookContext extends BuildHookContextBase {}

export class BuildCompileTestSubHook extends AsyncHook<BuildCompileTestSubHookContext> {
  readonly config: Configuration;

  constructor(opts: { config: Configuration }) {
    super();

    this.config = opts.config;
  }
}

export interface BuildHookContext extends BuildHookContextBase {
  readonly hook: {
    readonly compile: BuildCompileSubHook;
  };
}

export class BuildHook extends AsyncHook<BuildHookContext> {
  config: Configuration;

  constructor({ config }: { config: Configuration }) {
    super();
    this.config = config;
  }

  public async _call(cliParameterValue?: BuildCommandLineParametersValue): Promise<void> {
    const compileHook = new BuildCompileSubHook({ config: this.config });

    const buildHookContext: BuildHookContext = {
      hook: {
        compile: compileHook
      },
      commandLineParameters: cliParameterValue,
      getScopedLogger,
      config: this.config
    };

    await super.emit(buildHookContext);

    const compileHookContext: BuildCompileSubHookContext = {
      commandLineParameters: cliParameterValue,
      getScopedLogger,
      hook: {
        run: new BuildCompileRunSubHook(),
        emit: new BuildCompileEmitSubHook(),
        recompile: new BuildCompileReStartSubHook(),
        test: new BuildCompileTestSubHook({ config: this.config })
      },
      config: this.config
    };

    await compileHook.call(compileHookContext);
  }
}
