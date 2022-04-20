/**
 * 封装一些同步方法相关的操作
 * @status WIP
 */

/**
 * 异步的任务，总是返回一个promise对象，resolve为空
 */
export type Task<TArgs = unknown> = (
  arg?: TArgs,
  callback?: (args?: TArgs) => void
) => Promise<void>;

/**
 * 异步任务，总是返回一个promise，resolve指定的数据
 */
export type TaskWithReturnType<TArgs = unknown, TReturn = unknown> = (
  arg?: TArgs
) => Promise<TReturn>;

export function isAsyncTask(maybeTask: unknown): boolean {
  return !!(
    maybeTask &&
    maybeTask.constructor &&
    // async-function | generator-function
    (maybeTask.constructor.name === 'AsyncFunction' ||
      maybeTask.constructor.name === 'GeneratorFunction')
  );
}

/**
 * 顺序执行所有的任务
 * @param tasks
 * @param args
 */
export async function serialize<TaskArgs = unknown>(
  tasks: Task<TaskArgs>[],
  args?: TaskArgs
): Promise<void> {
  return tasks.reduce((promise, task): Promise<void> => {
    return promise.then(
      () => task(args),
      (e: unknown) => Promise.reject(e)
    );
  }, Promise.resolve());
}

/**
 * 使用 all 方法模拟所有 task 的同步执行，
 * 所有的 task 按顺序执行，但是并非按序返回。
 * @param tasks
 * @param args
 */
export async function parallel<TaskArgs>(
  tasks: Task<TaskArgs>[],
  args?: TaskArgs
): Promise<void[]> {
  return Promise.all(tasks.map(task => task(args)));
}
