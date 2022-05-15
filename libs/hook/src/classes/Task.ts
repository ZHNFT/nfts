import { Execution } from "@nfts/node-utils-library";

/**
 * 用来包装Task
 */
export class Task<TArgs = unknown, TReturn = unknown> {
  readonly raw: Execution.TaskFunc<TArgs, TReturn>;

  next!: Task<TArgs, TReturn>;
  isUsed = false;
  manual = false;

  constructor(task: Execution.TaskFunc<TArgs, TReturn>) {
    this.raw = task;
  }

  apply(...args: [TArgs]): TReturn {
    if (this.isUsed) {
      return this.next?.apply(...args);
    }

    let callback: (args: TArgs) => void = () => {
      //  do nothing
    };

    if (this.manual) {
      callback = (args: TArgs): void => {
        this.isUsed = true;
        if (this.next) {
          this.next.apply(args);
        }
      };
    }

    return this.raw.call(null, ...args, callback);
  }
}
