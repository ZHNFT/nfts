import { AsyncHook, WaterfallHook } from "@nfts/hook";
import { Stage, StageSubHook, StageCommonContext } from "../classes/Stage";
import { BundleCommandLineParametersValue } from "../cli/commands/BundleCommand";

export type TBundleCompileSubStageContext = StageCommonContext<
  BundleCommandLineParametersValue,
  BundleSubStageHooks
>;

export class BundleSubStageHooks extends StageSubHook {}

export class BundleStageHooks {
  // 修改 webpack 配置的 hook
  readonly configure: WaterfallHook<unknown> = new WaterfallHook<unknown>();
  readonly compile = new AsyncHook<TBundleCompileSubStageContext>();
  readonly preCompile = new AsyncHook<TBundleCompileSubStageContext>();
}

export class BundleStage extends Stage<BundleStageHooks> {
  constructor() {
    super({
      hooks: new BundleStageHooks(),
    });
  }

  async executeAsync(
    parameters: BundleCommandLineParametersValue
  ): Promise<void> {
    await this.executeInnerHook(parameters);

    const bundleArgs: TBundleCompileSubStageContext = {
      hooks: new BundleSubStageHooks(),
      cmdParams: parameters,
    };
    await this.hooks.preCompile.call(bundleArgs);
    await BundleStage._runSubStageHooks("preCompile", bundleArgs.hooks);

    await this.hooks.compile.call(bundleArgs);
    await BundleStage._runSubStageHooks("compile", bundleArgs.hooks);
  }

  private static async _runSubStageHooks(
    _: string,
    hooks: BundleSubStageHooks
  ) {
    await hooks.run.call(undefined);
  }
}
