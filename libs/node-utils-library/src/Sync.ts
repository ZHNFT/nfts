/**
 * 同步的task
 */
export type Task<TArgs = unknown> = (arg?: TArgs, callback?: (args?: TArgs) => void) => void;

/**
 * 返回指定数据task
 */
export type TaskWithReturnType<TArgs = unknown, TReturn = unknown> = (arg?: TArgs) => TReturn;

export function isSyncTask(task: unknown): boolean {
  return !!(task && task.constructor && task.constructor.name === 'Function');
}
