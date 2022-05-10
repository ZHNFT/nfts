import { performance } from 'perf_hooks';

export function now() {
  return performance.now();
}

export class Measure {
  /**
   * human readable ms format
   * @param milliseconds
   * @param unit
   * @returns
   */
  public static msFormat(milliseconds: number): string {
    const unit = ['h', 'm', 's', 'ms'];
    const h = Math.floor(milliseconds / (1000 * 60 * 60));
    let rest = milliseconds % (1000 * 60 * 60);
    const m = Math.floor(rest / (1000 * 60));
    rest = rest % (1000 * 60);
    const s = Math.floor(rest / 1000);
    rest = rest % 1000;
    return [h, m, s, rest].reduce((str, current, index) => {
      if (current > 0) {
        str += `${current}${unit[index]}`;
      }

      return str;
    }, '');
  }

  /**
   * 返回同步 task 的执行时间
   * @param mark
   * @param task
   * @param callback
   */
  public static taskSync(mark: string, task: () => void, callback?: (spendMs: number) => void) {
    const _start = now();
    task();
    callback?.(now() - _start);
  }

  /**
   * 返回异步 task 的执行时间
   * @param task
   * @param callback
   */
  public static taskAsync(task: () => Promise<void>, callback?: (spendMs: number) => void): Promise<void> {
    const _start = now();
    return task().finally(() => {
      callback?.(now() - _start);
    });
  }
}
