import { Execution } from '@nfts/node-utils-library';
import { Hook } from '../classes/Hook';

export class WaterfallHook<TArgs = unknown> extends Hook<TArgs, TArgs | Promise<TArgs>> {
  public call(args?: TArgs): Promise<TArgs> {
    const tasks = Array.from(this.taskByName.values());
    return Execution.waterfall<TArgs>(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tasks.map(task => {
        return task.apply.bind(task);
      }),
      args
    );
  }
}
