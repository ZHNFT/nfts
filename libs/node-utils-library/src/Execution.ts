import { TaskWithReturnType as AsyncTaskWithReturnType } from './Async';
import { TaskWithReturnType as SyncTaskWithReturnType } from './Sync';

export type TTaskWithArgsAndReturn<TArgs, TReturn> = (args: TArgs) => TReturn;

export type TSyncTaskWithArgs<TArgs> = TTaskWithArgsAndReturn<TArgs, void>;
export type TAsyncTaskWithArgs<TArgs> = TTaskWithArgsAndReturn<TArgs, Promise<void>>;
export type TSyncTaskWithReturn<TReturn> = () => TReturn;
export type TAsyncTaskWithReturn<TReturn> = () => Promise<TReturn>;
export type TSyncVoidTask = TSyncTaskWithReturn<void>;
export type TAsyncVoidTask = TAsyncTaskWithReturn<void>;

/**
 * 按需执行task，上一个task执行返回的结果作为下一个task的输入，
 * 如果有错误的话，立即终端；
 * @param tasks
 * @param args
 * @returns
 */
export async function waterfall<TArgs = unknown>(
  tasks: (AsyncTaskWithReturnType<TArgs, TArgs> | SyncTaskWithReturnType<TArgs, TArgs>)[],
  args?: TArgs
): Promise<TArgs> {
  return tasks.reduce((promise, task): Promise<TArgs> => {
    return promise.then(
      (nextArgs: TArgs) => task(nextArgs),
      (e: unknown) => Promise.reject(e)
    );
  }, Promise.resolve(args));
}
