import { AsyncHook, WaterfallHook } from '@nfts/hook';
import { Stage, StageHookBase } from '../classes/Stage';
import { Configuration } from '../classes/Configuration';

export interface IStageContext<THooks = CompileSubStageHooks, THookOptions = unknown> {
  hooks: THooks;
  options: THookOptions;
}

export class BuildSubStageHooks {
  readonly run: AsyncHook = new AsyncHook();
}

export class CompileSubStageHooks extends BuildSubStageHooks {
  readonly afterCompile: AsyncHook = new AsyncHook();
  readonly afterRecompile: AsyncHook = new AsyncHook();
}

export class PreCompileSubstageHooks extends BuildSubStageHooks {}

export class BundleSubStageHooks extends BuildSubStageHooks {
  readonly configure: WaterfallHook = new WaterfallHook();
  readonly afterConfigure: AsyncHook = new AsyncHook();
}

export class BuildStageHooks extends StageHookBase {
  readonly compile: AsyncHook<IStageContext<CompileSubStageHooks, {}>> = new AsyncHook<
    IStageContext<CompileSubStageHooks, {}>
  >();
  readonly bundle: AsyncHook<IStageContext<BundleSubStageHooks, {}>> = new AsyncHook<
    IStageContext<BundleSubStageHooks, {}>
  >();
  readonly preCompile: AsyncHook<IStageContext<PreCompileSubstageHooks, {}>> =
    new AsyncHook<IStageContext<PreCompileSubstageHooks, {}>>();
}

export class BuildStage extends Stage<BuildStageHooks> {
  constructor(gmfConfig: Configuration) {
    const stageHooks = new BuildStageHooks();
    super({ gmfConfig, hooks: stageHooks });
  }

  async executeAsync(): Promise<void> {
    const preCompileArgs: IStageContext<PreCompileSubstageHooks, {}> = {
      hooks: new PreCompileSubstageHooks(),
      options: {}
    };
    await this.hooks.preCompile.call(preCompileArgs);
    await this._runSubStageHooks('preCompile', preCompileArgs.hooks);

    const compileArgs: IStageContext<CompileSubStageHooks, {}> = {
      hooks: new CompileSubStageHooks(),
      options: {}
    };
    await this.hooks.compile.call(compileArgs);
    await this._runSubStageHooks('Compile', compileArgs.hooks);

    const bundleArgs: IStageContext<BundleSubStageHooks, {}> = {
      hooks: new BundleSubStageHooks(),
      options: {}
    };
    await this.hooks.bundle.call(bundleArgs);
    await this._runSubStageHooks('Bundle', bundleArgs.hooks);
  }

  private async _runSubStageHooks(_: string, hooks: BuildSubStageHooks) {
    await hooks.run.call();
  }
}
