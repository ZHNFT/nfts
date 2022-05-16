// Task function
export type TaskFunc<TArgs, TReturn = void | Promise<void>> = (
  args: TArgs,
  callback?: TaskFunc<TArgs, void>
) => TReturn;

/**
 * 按需执行task，上一个task执行返回的结果作为下一个task的输入，如果有错误的话，立即终端；
 * @param tasks
 * @param args
 */
export async function waterfall<TArgs = unknown>(
  tasks: TaskFunc<TArgs, TArgs | Promise<TArgs>>[],
  args: TArgs
): Promise<TArgs> {
  return tasks.reduce((promise, task): Promise<TArgs> => {
    return promise.then(
      (nextArgs: TArgs) => task(nextArgs),
      (e: unknown) => Promise.reject(e)
    );
  }, Promise.resolve(args));
}

/**
 * 使用 all 方法模拟所有 task 的同步执行，所有的 task 按顺序执行，但是并非按序返回。
 * @param tasks
 * @param args
 */
export async function parallel<TArgs = unknown>(
  tasks: TaskFunc<TArgs>[],
  args: TArgs
): Promise<void[]> {
  return Promise.all(tasks.map((task) => task(args)));
}

/**
 * 顺序执行所有的任务
 * @param tasks
 * @param args
 */
export async function serialize<TArgs = unknown>(
  tasks: TaskFunc<TArgs>[],
  args: TArgs
): Promise<void> {
  return tasks.reduce((promise, task): Promise<void> => {
    return promise.then(
      () => task(args),
      (e: Error) => Promise.reject(e)
    );
  }, Promise.resolve());
}

/**
 *
 * @param maybeTask
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isAsyncTask(maybeTask: Function): boolean {
  return !!(
    maybeTask &&
    maybeTask.constructor &&
    (maybeTask.constructor.name === "AsyncFunction" ||
      maybeTask.constructor.name === "GeneratorFunction")
  );
}

/**
 *
 * @param maybeTask
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isSyncTask(maybeTask: Function): boolean {
  return !!(
    maybeTask &&
    maybeTask.constructor &&
    maybeTask.constructor.name === "Function"
  );
}
