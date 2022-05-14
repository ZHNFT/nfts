import { Execution } from '@nfts/node-utils-library';

/**
 * 用来包装Task
 */
export class Task<TArgs = unknown, TReturn = void> {
  readonly raw: Execution.TTask<TArgs, TReturn>;

  next: Task<TArgs, TReturn> | undefined;
  isUsed = false;
  manual = false;

  constructor(task: Execution.TTask<TArgs, TReturn>) {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.raw.call(null, ...(args as TArgs[]), callback);
  }
}
