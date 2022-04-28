import { AsyncHook, WaterfallHook } from '@nfts/hook';
import { Configuration } from '../classes/Configuration';
import { Stage, StageHookBase } from '../classes/Stage';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';
import { getScopedLogger } from '../utils/getScopeLogger';

export interface IStageContext<THooks = CompileSubStageHooks, THookOptions = unknown> {
  hooks: THooks;
  options: THookOptions;
}

interface IBuildStageParameters {
  commandLineParameters: BuildCommandLineParametersValue;
  config: Configuration;
  getScopedLogger: typeof getScopedLogger;
}

export class BuildSubStageHooks {
  readonly run: AsyncHook = new AsyncHook();
}

export class CompileSubStageHooks extends BuildSubStageHooks {
  readonly afterCompile: AsyncHook = new AsyncHook();
  readonly afterRecompile: AsyncHook = new AsyncHook();
}

export class PreCompileSubstageHooks extends BuildSubStageHooks {}

export class afterCompileSubStageHooks extends BuildSubStageHooks {}

export class BundleSubStageHooks extends BuildSubStageHooks {
  readonly configure: WaterfallHook = new WaterfallHook();
  readonly afterConfigure: AsyncHook = new AsyncHook();
}

export class BuildStageHooks extends StageHookBase {
  readonly compile: AsyncHook<
    IStageContext<CompileSubStageHooks, IBuildStageParameters>
  > = new AsyncHook<IStageContext<CompileSubStageHooks, IBuildStageParameters>>();
  readonly bundle: AsyncHook<IStageContext<BundleSubStageHooks, IBuildStageParameters>> =
    new AsyncHook<IStageContext<BundleSubStageHooks, IBuildStageParameters>>();
  readonly preCompile: AsyncHook<
    IStageContext<PreCompileSubstageHooks, IBuildStageParameters>
  > = new AsyncHook<IStageContext<PreCompileSubstageHooks, IBuildStageParameters>>();
  readonly afterCompile: AsyncHook<
    IStageContext<afterCompileSubStageHooks, IBuildStageParameters>
  > = new AsyncHook<IStageContext<afterCompileSubStageHooks, IBuildStageParameters>>();
}

export class BuildStage extends Stage<BuildStageHooks> {
  constructor(gmfConfig: Configuration) {
    const stageHooks = new BuildStageHooks();
    super({ gmfConfig, hooks: stageHooks });
  }

  async executeAsync(parameters?: BuildCommandLineParametersValue): Promise<void> {
    const options: IBuildStageParameters = {
      commandLineParameters: parameters,
      config: this.gmfConfig,
      getScopedLogger
    };

    const preCompileArgs: IStageContext<PreCompileSubstageHooks, IBuildStageParameters> =
      {
        hooks: new PreCompileSubstageHooks(),
        options
      };
    await this.hooks.preCompile.call(preCompileArgs);
    await this._runSubStageHooks('preCompile', preCompileArgs.hooks);

    const compileArgs: IStageContext<CompileSubStageHooks, IBuildStageParameters> = {
      hooks: new CompileSubStageHooks(),
      options
    };
    await this.hooks.compile.call(compileArgs);
    await this._runSubStageHooks('Compile', compileArgs.hooks);

    const bundleArgs: IStageContext<BundleSubStageHooks, IBuildStageParameters> = {
      hooks: new BundleSubStageHooks(),
      options
    };
    await this.hooks.bundle.call(bundleArgs);
    await this._runSubStageHooks('Bundle', bundleArgs.hooks);

    await this.hooks.afterCompile.call();
  }

  private async _runSubStageHooks(_: string, hooks: BuildSubStageHooks) {
    await hooks.run.call();
  }
}
