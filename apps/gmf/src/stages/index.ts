import { AsyncHook } from '@nfts/hook';
import { StageCommonContext } from '../classes/Stage';
import { BuildStage, BuildStageHooks } from './BuildStage';
import { BundleStage, BundleStageHooks } from './BundleStage';
import { BundleCommandLineParametersValue } from '../cli/commands/BundleCommand';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';

interface IStages {
  build: BuildStage;
  bundle: BundleStage;
}

interface IStageHooks {
  build: AsyncHook<StageCommonContext<BuildCommandLineParametersValue, BuildStageHooks>>;
  bundle: AsyncHook<StageCommonContext<BundleCommandLineParametersValue, BundleStageHooks>>;
}

export { BuildStageHooks, BundleStageHooks, BuildStage, BundleStage, IStages, IStageHooks };
