import { AsyncHook, WaterfallHook } from '@nfts/hook';
import { Configuration } from '../classes/Configuration';
import { Stage, StageHookBase } from '../classes/Stage';
import { BundleCommandLineParametersValue } from '../cli/commands/BundleCommand';
import { getScopedLogger } from '../utils/getScopeLogger';

export interface IBundleStageContext<THooks = BundleSubStageHooksBase, THookOptions = unknown> {
  hooks: THooks;
  options: THookOptions;
}

interface IBundleStageContextProps {
  commandLineParameters: BundleCommandLineParametersValue;
  config: Configuration;
  getScopedLogger: typeof getScopedLogger;
}

export class BundleSubStageHooksBase {
  readonly run: AsyncHook = new AsyncHook();
}

export class BundleSubStageHooks extends BundleSubStageHooksBase {
  readonly configure: WaterfallHook = new WaterfallHook();
  readonly afterConfigure: AsyncHook = new AsyncHook();
}

export class BundleStageHooks extends StageHookBase {
  readonly bundle: AsyncHook<IBundleStageContext<BundleSubStageHooks, IBundleStageContextProps>> = new AsyncHook<
    IBundleStageContext<BundleSubStageHooks, IBundleStageContextProps>
  >();
}

export class BundleStage extends Stage<BundleStageHooks> {
  constructor(gmfConfig: Configuration) {
    const stageHooks = new BundleStageHooks();
    super({ gmfConfig, hooks: stageHooks });
  }

  async executeAsync(parameters?: BundleCommandLineParametersValue): Promise<void> {
    const options: IBundleStageContextProps = {
      commandLineParameters: parameters,
      config: this.gmfConfig,
      getScopedLogger
    };

    const bundleArgs: IBundleStageContext<BundleSubStageHooks, IBundleStageContextProps> = {
      hooks: new BundleSubStageHooks(),
      options
    };
    await this.hooks.bundle.call(bundleArgs);
    await this._runSubStageHooks('Bundle', bundleArgs.hooks);
  }

  private async _runSubStageHooks(_: string, hooks: BundleSubStageHooks) {
    await hooks.run.call();
  }
}
