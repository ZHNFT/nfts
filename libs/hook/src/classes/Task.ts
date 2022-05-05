import { Execution } from '@nfts/node-utils-library';

/**
 * 用来包装Task
 */
export class Task<TArgs = unknown, TReturn = unknown> {
  readonly raw: Execution.TTask<TArgs, TReturn>;

  next: Task<TArgs, TReturn>;
  isUsed: boolean;
  manual: boolean;

  constructor(task: Execution.TTask<TArgs, TReturn>) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.raw = task;
  }

  apply(...args: Array<unknown>): unknown {
    if (this.isUsed) {
      return this.next ? this.next.apply(args) : undefined;
    }

    let callback: (args?: TArgs) => void;

    if (this.manual) {
      callback = (args?: TArgs): void => {
        this.isUsed = true;
        if (this.next) {
          this.next.apply(args);
        }
      };
    }

    return this.raw.call(null, ...args, callback);
  }
}
