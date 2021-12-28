//
// export type TCommandActionApplySyncFn<TContext, TCommandActionConfig> = (
//   ctx: TContext,
//   actionConfig: TCommandActionConfig
// ) => void;
//
// export type TCommandActionApplyAsyncFn<TContext, TCommandActionConfig> = (
//   ctx: TContext,
//   actionConfig: TCommandActionConfig
// ) => Promise<void>;

export abstract class BaseAction<T, C> {
  abstract apply(session: T, config: C): void;
}
