import { Async, Sync } from '@nfts/node-utils-library';
import { Task } from './Task';

/**
 * Hook的基础类型；
 * 提供基础的HookCallback解析处理；
 * 1. 一个taskName只对应一个task方法；
 * 2. 一个Hook中只存在一种类型的task；
 */
export abstract class Hook<TTask> {
  protected lastAddedTask: Task;
  protected readonly taskByName: Map<string, Task> = new Map();

  public add(taskName: string, task: TTask): void {
    if (!Sync.isSyncTask(task) && !Async.isAsyncTask(task)) {
      throw new Error(`Expecting a hook task type 'function', instead of '${typeof task}'`);
    }

    if (this.taskByName.has(taskName)) {
      console.warn(`Task with name '${taskName}' already be registered` + `Consider to use a different task name`);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const taskWrapper = new Task(task);

      if (this.lastAddedTask) {
        this.lastAddedTask.next = taskWrapper;
      }

      this.lastAddedTask = taskWrapper;
      this.taskByName.set(taskName, taskWrapper);
    }
  }

  // 不同类型Hook需要实现自己的emit方法，以实现预期的执行顺序；
  abstract call(args?: unknown): unknown;
}
