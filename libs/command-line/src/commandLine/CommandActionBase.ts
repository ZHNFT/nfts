//
export type TCommandActionApplySyncFn<TContext, TCommandActionConfig> = (
  ctx: TContext,
  actionConfig: TCommandActionConfig
) => void;

export type TCommandActionApplyAsyncFn<TContext, TCommandActionConfig> = (
  ctx: TContext,
  actionConfig: TCommandActionConfig
) => Promise<void>;

export abstract class CommandActionBase<T, C> {
  apply = () => {
    console.log('apply ');
  };
}
