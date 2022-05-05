export type TTaskCallback<T> = (args?: T) => void;
export type TSyncTask<TArgs = unknown, TRes = void> = (args?: TArgs, callback?: TTaskCallback<TArgs>) => TRes;
export type TAsyncTask<TArgs = unknown, TRes = void> = (args?: TArgs, callback?: TTaskCallback<TArgs>) => Promise<TRes>;

export type TTask<TArgs = unknown, TRes = void> = TSyncTask<TArgs, TRes> | TAsyncTask<TArgs, TRes>;

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

/**
 * 使用 all 方法模拟所有 task 的同步执行，
 * 所有的 task 按顺序执行，但是并非按序返回。
 * @param tasks
 * @param args
 * @returns {Promise<void[]>}
 */
export async function parallel<TaskArgs = unknown>(tasks: TTask<TaskArgs>[], args?: TaskArgs): Promise<void[]> {
  return Promise.all(tasks.map(task => task(args)));
}

/**
 * 顺序执行所有的任务
 * @param tasks
 * @param args
 * @returns {Promise<void>}
 */
export async function serialize<TaskArgs = unknown>(tasks: TTask<TaskArgs>[], args?: TaskArgs): Promise<void> {
  return tasks.reduce((promise, task): Promise<void> => {
    return promise.then(
      () => task(args),
      (e: Error) => Promise.reject(e)
    );
  }, Promise.resolve());
}
