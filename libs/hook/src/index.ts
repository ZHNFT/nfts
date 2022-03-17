export type THookCallback = (...arg: any) => void | Promise<any>;

export class Hook {
	private readonly _hooks: Map<string, THookCallback>;

	constructor() {
		this._hooks = new Map<string, THookCallback>();
	}

	/**
	 * @method
	 *
	 * @public
	 * */
	public addHook(hookName: string, callback: THookCallback): void {
		this._hooks.set(hookName, callback);
	}

	/**
	 * @method
	 *
	 * @public
	 * */
	public emitHook(name: string, args: any): void {
		const _hookCallback = this._hooks.get(name);

		if (_hookCallback) {
			_hookCallback.call(null, args);
		}
	}

	/**
	 * @method
	 *
	 * @public
	 * */
	public promise(args: any): Promise<any> {
		return Hook.serialize(Array.from(this._hooks.values()), args);
	}

	/**
	 * 序列化Promise调用，适用于普通函数；
	 * @method serialize
	 * @param  {THookCallback[]} tasks 待执行的 Promise 任务；
	 * @param  {any}             args  传递给方法的参数；
	 * @return {Promise<any>}
	 */
	public static serialize(tasks: THookCallback[], args: any): Promise<any> {
		return tasks.reduce((promise, task) => {
			return promise.then(
				() => task(args),
				e => Promise.reject(e)
			);
		}, Promise.resolve(null));
	}

	public static serialCall(
		fns: THookCallback[],
		caller: (task: THookCallback) => Promise<any>
	): Promise<any> {
		return fns.reduce((promise, currentFn) => {
			return promise.then(
				() => caller(currentFn),
				(e: Error) => Promise.reject(e)
			);
		}, Promise.resolve(null));
	}

	/**
	 *
	 * 同步执行所有tasks，不关心最后输task执行的顺序；
	 * @method parallelCall
	 * @param  {THookCallback[]}   fns
	 * @param  {THookCallback) =>  Promise<any>} caller
	 * @return {Promise<any>}
	 */
	public static parallelCall(
		fns: THookCallback[],
		caller: (task: THookCallback) => Promise<any>
	): Promise<any> {
		return Promise.all(fns.map(fn => caller(fn)));
	}
}
