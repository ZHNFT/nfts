import { Configuration } from './Configuration';

export abstract class StageHookBase {}

export abstract class Stage<
  THooks extends StageHookBase = unknown,
  TStageProperties = unknown,
  TStageOptions = unknown
> {
  readonly hooks: THooks;
  readonly stageProperties: TStageProperties;
  readonly stageOptions: TStageOptions;
  readonly gmfConfig: Configuration;
  constructor({ gmfConfig, hooks }: { gmfConfig: Configuration; hooks: THooks }) {
    this.gmfConfig = gmfConfig;
    this.hooks = hooks;
  }

  abstract executeAsync(): Promise<void>;
}
