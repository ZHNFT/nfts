import { Hook } from '../classes/Hook';
import { Execution } from '@nfts/node-utils-library';

/**
 * 提供callback作为激活下一个task的入口；
 * 将此hook内的所有Task的manual设置成TRUE，在执行第一个task即可，是否继续执行下一个task由前一个task决定；
 */
export class ManualHook<TArgs = unknown> extends Hook<TArgs, void | Promise<void>> {
  call(args?: TArgs): void {
    const tasks = Array.from(this.taskByName.values()).map(task => {
      task.manual = true;
      return task;
    });

    const firstTask = tasks[0];

    if (!firstTask) {
      throw new Error(`No task in ManualHook,\n` + `Using .add(Task) to hookup tasks`);
    }

    // Invoke first task
    firstTask.apply(args);
  }
}
