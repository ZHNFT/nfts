import { Execution } from '@nfts/node-utils-library';
import { Hook } from '../classes/Hook';

export class AsyncHook<TArgs = unknown> extends Hook<Execution.TTask<TArgs> | Execution.TTask<TArgs>> {
  constructor() {
    super();
  }

  call(args?: TArgs): Promise<void> | void {
    const tasks = Array.from(this.taskByName.values());
    return Execution.serialize(
      tasks.map(task => {
        return task.apply.bind(task) as Execution.TAsyncTask<TArgs>;
      }),
      args
    );
  }
}
