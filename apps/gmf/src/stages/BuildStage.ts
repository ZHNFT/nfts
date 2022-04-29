import { AsyncHook } from '@nfts/hook';
import { Configuration } from '../classes/Configuration';
import { Stage, StageHookBase } from '../classes/Stage';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';
import { getScopedLogger } from '../utils/getScopeLogger';

export interface IBuildStageContext<THooks = CompileSubStageHooks, THookOptions = unknown> {
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

// export class BundleSubStageHooks extends BuildSubStageHooks {
//   readonly configure: WaterfallHook = new WaterfallHook();
//   readonly afterConfigure: AsyncHook = new AsyncHook();
// }

export class BuildStageHooks extends StageHookBase {
  readonly compile: AsyncHook<IBuildStageContext<CompileSubStageHooks, IBuildStageParameters>> = new AsyncHook<
    IBuildStageContext<CompileSubStageHooks, IBuildStageParameters>
  >();
  readonly preCompile: AsyncHook<IBuildStageContext<PreCompileSubstageHooks, IBuildStageParameters>> = new AsyncHook<
    IBuildStageContext<PreCompileSubstageHooks, IBuildStageParameters>
  >();
  readonly afterCompile: AsyncHook<IBuildStageContext<afterCompileSubStageHooks, IBuildStageParameters>> =
    new AsyncHook<IBuildStageContext<afterCompileSubStageHooks, IBuildStageParameters>>();
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

    const preCompileArgs: IBuildStageContext<PreCompileSubstageHooks, IBuildStageParameters> = {
      hooks: new PreCompileSubstageHooks(),
      options
    };
    await this.hooks.preCompile.call(preCompileArgs);
    await this._runSubStageHooks('preCompile', preCompileArgs.hooks);

    const compileArgs: IBuildStageContext<CompileSubStageHooks, IBuildStageParameters> = {
      hooks: new CompileSubStageHooks(),
      options
    };
    await this.hooks.compile.call(compileArgs);
    await this._runSubStageHooks('Compile', compileArgs.hooks);

    await this.hooks.afterCompile.call();
  }

  private async _runSubStageHooks(_: string, hooks: BuildSubStageHooks) {
    await hooks.run.call();
  }
}
