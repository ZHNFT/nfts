import { Execution } from '@nfts/node-utils-library';
import { Hook } from '../classes/Hook';

export class ParallelHook<TArgs = unknown> extends Hook<TArgs> {
  constructor() {
    super();
  }

  call(args?: TArgs): Promise<void[]> {
    const tasks = Array.from(this.taskByName.values());
    return Execution.parallel(
      tasks.map(task => {
        return task.apply.bind(task) as Execution.TSyncTask<TArgs>;
      }),
      args
    );
  }
}
