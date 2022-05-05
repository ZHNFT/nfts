import { TTask } from './Execution';

/**
 *
 * @param maybeTask 校验函数是否是 async function 或者 generator function
 * @returns {boolean}
 */
export function isAsyncTask(maybeTask: unknown): boolean {
  return !!(
    maybeTask &&
    maybeTask.constructor &&
    (maybeTask.constructor.name === 'AsyncFunction' || maybeTask.constructor.name === 'GeneratorFunction')
  );
}

/**
 * 顺序执行所有的任务
 * @param tasks
 * @param args
 * @returns {Promise<void>}
 * @deprecated Using Execution.serialize
 */
export async function serialize<TaskArgs = unknown>(tasks: TTask<TaskArgs>[], args?: TaskArgs): Promise<void> {
  return tasks.reduce((promise, task): Promise<void> => {
    return promise.then(
      () => task(args),
      (e: Error) => Promise.reject(e)
    );
  }, Promise.resolve());
}

/**
 * 使用 all 方法模拟所有 task 的同步执行，
 * 所有的 task 按顺序执行，但是并非按序返回。
 * @param tasks
 * @param args
 * @returns {Promise<void[]>}
 * @deprecated Using Execution.parallel
 */
export async function parallel<TaskArgs = unknown>(tasks: TTask<TaskArgs>[], args?: TaskArgs): Promise<void[]> {
  return Promise.all(tasks.map(task => task(args)));
}
