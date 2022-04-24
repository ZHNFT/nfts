import { Async, Sync } from '@nfts/node-utils-library';
import { Hook } from '../classes/Hook';

export class AsyncHook<TArgs = unknown> extends Hook<
	Async.Task<TArgs> | Sync.Task<TArgs>
> {
	constructor() {
		super();
	}

	call(args?: TArgs): Promise<void> | void {
		const tasks = Array.from(this.taskByName.values());
		return Async.serialize(
			tasks.map(task => {
				return task.apply.bind(task) as Async.Task<TArgs>;
			}),
			args
		);
	}
}
