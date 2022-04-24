import { Async, Sync } from '@nfts/node-utils-library';
import { Hook } from '../classes/Hook';

/**
 * 同步任务的支持
 */
export class SyncHook<TArgs = unknown> extends Hook<Sync.Task<TArgs>> {
	public add(taskName: string, task: Sync.Task<TArgs>): void {
		if (!Sync.isSyncTask(task)) {
			if (Async.isAsyncTask(task)) {
				console.warn(
					`Unexpected async task added to SyncHook ${taskName};\n` +
						`Async task in SyncHook may not work properly`
				);
			} else {
				throw new Error(
					`Expecting task type of 'function',` + ` instead of ${typeof task}`
				);
			}
		}

		super.add(taskName, task);
	}

	call(args?: TArgs): void {
		const tasks = this.taskByName.values();
		// 同步方法，直接遍历执行task；
		for (const task of tasks) {
			task.apply(args);
		}
	}
}
