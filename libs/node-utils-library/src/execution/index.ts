export type TSyncTask<TArgs = unknown, TRes = void> = (args: TArgs) => TRes;
export type TAsyncTask<TArgs = unknown, TRes = void> = (args: TArgs, callback?: TVoidTask<TArgs>) => Promise<TRes>;
export type TVoidTask<TArgs = unknown> = TSyncTask<TArgs, void>;

/**
 * @remark 所有的 Task 方法的类型，默认返回值为void
 */
export type TTask<TArgs = unknown, TRes = void> = (args: TArgs, callback?: TVoidTask<TArgs>) => TRes;

/**
 * 按需执行task，上一个task执行返回的结果作为下一个task的输入，
 * 如果有错误的话，立即终端；
 * @param tasks
 * @param args
 * @returns {Promise<TArgs = unknown>}
 */
export async function waterfall<TArgs = unknown>(
  tasks: TTask<TArgs, TArgs | Promise<TArgs>>[],
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
 * 使用 all 方法模拟所有 task 的同步执行，
 * 所有的 task 按顺序执行，但是并非按序返回。
 * @param tasks
 * @param args
 * @returns {Promise<void[]>}
 */
export async function parallel<TArgs = unknown>(tasks: TTask<TArgs>[], args: TArgs = {} as TArgs): Promise<void[]> {
  return Promise.all(tasks.map(task => task(args)));
}

/**
 * 顺序执行所有的任务
 * @param tasks
 * @param args
 * @returns {Promise<void>}
 */
export async function serialize<TaskArgs = unknown>(
  tasks: TTask<TaskArgs>[],
  args: TaskArgs = {} as TaskArgs
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
 * @param maybeTask 校验函数是否是 async function 或者 generator function
 * @returns {boolean}
 */
export function isAsyncTask(maybeTask: unknown): boolean {
  return !!(
    maybeTask &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    maybeTask.constructor &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (maybeTask.constructor.name === 'AsyncFunction' || maybeTask.constructor.name === 'GeneratorFunction')
  );
}

/**
 *
 * @param maybeTask 校验函数是否是 function
 * @returns {boolean}
 */
export function isSyncTask(maybeTask: unknown): boolean {
  return !!(
    maybeTask &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    maybeTask.constructor &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    maybeTask.constructor.name === 'Function'
  );
}
