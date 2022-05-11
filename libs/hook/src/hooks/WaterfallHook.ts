import { Execution } from '@nfts/node-utils-library';
import { Hook } from '../classes/Hook';

export type TWaterfallTask<TArgs> = Execution.TTask<TArgs, TArgs>;

export class WaterfallHook<TArgs = unknown> extends Hook<TWaterfallTask<TArgs>> {
  public call(args?: TArgs): Promise<TArgs> {
    const tasks = Array.from(this.taskByName.values());
    return Execution.waterfall(
      tasks.map(task => {
        return task.apply.bind(task) as TWaterfallTask<TArgs>;
      }),
      args
    );
  }
}
