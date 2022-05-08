import { TSyncTask, TAsyncTask } from './interface';

/**
 * 按需执行task，上一个task执行返回的结果作为下一个task的输入，
 * 如果有错误的话，立即终端；
 * @param tasks
 * @param args
 * @returns {Promise<TArgs = unknown>}
 */
export async function waterfall<TArgs = unknown>(
  tasks: (TSyncTask<TArgs, TArgs> | TAsyncTask<TArgs, TArgs>)[],
  args?: TArgs
): Promise<TArgs> {
  return tasks.reduce((promise, task): Promise<TArgs> => {
    return promise.then(
      (nextArgs: TArgs) => task(nextArgs),
      (e: unknown) => Promise.reject(e)
    );
  }, Promise.resolve(args));
}
