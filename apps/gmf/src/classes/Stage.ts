import { AsyncHook } from '@nfts/hook';

export interface StageCommonContext<TParams = unknown, THooks = unknown> {
  cmdParams: TParams;
  hooks: THooks;
}

export interface SubStageCommonContext<THooks = unknown> {
  hooks: THooks;
}

export abstract class StageSubHook {
  run: AsyncHook<unknown> = new AsyncHook<unknown>();
}

export abstract class Stage<
  THooks = unknown,
  TStageProperties = unknown,
  TStageOptions = unknown,
  TStageParams = unknown
> {
  readonly stageProperties: TStageProperties;
  readonly stageOptions: TStageOptions;

  readonly hooks: THooks;

  // 代表当前的 stage 的 hook
  readonly internalHook: AsyncHook<StageCommonContext<TStageParams, THooks>> = new AsyncHook<
    StageCommonContext<TStageParams, THooks>
  >();
  //
  protected constructor({ hooks }: { hooks: THooks }) {
    this.hooks = hooks;
  }

  public async executeInnerHook(params: TStageParams) {
    await this.internalHook.call({
      hooks: this.hooks,
      cmdParams: params
    });
  }

  abstract executeAsync(parameter?: unknown): Promise<void>;
}
