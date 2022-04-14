/**
 * 封装一些同步方法相关的操作
 * @status WIP
 */

export type Task<Args> = (arg: Args) => void | Promise<void>;

/**
 * 顺序执行所有的任务
 * @param tasks
 * @param args
 */
export async function serialize<TaskArgs = unknown>(
  tasks: Task<TaskArgs>[],
  args?: TaskArgs
) {
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
export async function parallel<TaskArgs>(tasks: Task<TaskArgs>[], args?: TaskArgs) {
  return Promise.all(tasks.map(task => task(args)));
}
