import { performance } from 'perf_hooks';

export function now() {
  return performance.now();
}

export enum Unit {
  S,
  M,
  H
}

export function millisecondsPrettier(milliseconds, unit = Unit.S): string {
  switch (unit) {
    case Unit.S:
      return (milliseconds / 1000).toFixed(2) + 's';
    case Unit.M:
      return (milliseconds / 1000 / 60).toFixed(1) + 'm';
    case Unit.H:
      return (milliseconds / 1000 / 60 / 60).toFixed(1) + 'h';
  }
}

/**
 * 返回同步 task 的执行时间
 * @param mark
 * @param task
 * @param callback
 */
export function taskSync(mark: string, task: () => void, callback?: (spendMs: number) => void) {
  const _start = now();
  task();
  callback?.(now() - _start);
}

/**
 * 返回异步 task 的执行时间
 * @param task
 * @param callback
 */
export function taskAsync(task: () => Promise<void>, callback?: (spendMs: number) => void): Promise<void> {
  const _start = now();
  return task().finally(() => {
    callback?.(now() - _start);
  });
}
