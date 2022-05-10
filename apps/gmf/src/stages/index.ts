import { AsyncHook, Hook } from '@nfts/hook';
import { StageCommonContext, Stage } from '../classes/Stage';
import { BuildStage, BuildStageHooks } from './BuildStage';
import { BundleStage, BundleStageHooks } from './BundleStage';
import { BundleCommandLineParametersValue } from '../cli/commands/BundleCommand';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';
import { Execution } from '@nfts/node-utils-library';

export interface IStages {
  build: BuildStage;
  bundle: BundleStage;
  [key: string]: Stage;
}

export interface IStageHooks {
  build: AsyncHook<StageCommonContext<BuildCommandLineParametersValue, BuildStageHooks>>;
  bundle: AsyncHook<StageCommonContext<BundleCommandLineParametersValue, BundleStageHooks>>;
  [key: string]: Hook<Execution.TTask>;
}

export { BuildStageHooks, BundleStageHooks, BuildStage, BundleStage };
