export type THookCallback<HookCallbackArgs> = (
	args: HookCallbackArgs
) => void | Promise<void>;

export class Hook<HookNames = string, HookCallbackArgs = void> {
	private readonly _hooks: Map<HookNames, THookCallback<HookCallbackArgs>[]>;

	constructor() {
		this._hooks = new Map<HookNames, THookCallback<HookCallbackArgs>[]>();
	}

	public addHook(hookName: HookNames, callback: THookCallback<HookCallbackArgs>): void {
		const callbacks = this._hooks.get(hookName) ?? [];
		callbacks.push(callback);
		this._hooks.set(hookName, callbacks);
	}

	public emitHook(hookName: HookNames, args: HookCallbackArgs): Promise<void> {
		const _hookCallbacks = this._hooks.get(hookName);

		if (_hookCallbacks && _hookCallbacks.length > 0) {
			return Hook.serialize(_hookCallbacks, args);
		}

		return Promise.resolve();
	}

	public static serialize<HookCallbackArgs>(
		tasks: THookCallback<HookCallbackArgs>[],
		args: HookCallbackArgs
	): Promise<void> {
		return tasks.reduce((promise, task) => {
			return promise.then(
				() => task(args),
				e => Promise.reject(e)
			);
		}, Promise.resolve());
	}

	public static serialCall<HookCallbackArgs>(
		fns: THookCallback<HookCallbackArgs>[],
		caller: (task: THookCallback<HookCallbackArgs>) => Promise<void>
	): Promise<void> {
		return fns.reduce((promise, currentFn) => {
			return promise.then(
				() => caller(currentFn),
				(e: Error) => Promise.reject(e)
			);
		}, Promise.resolve());
	}

	public static parallelCall<HookCallbackArgs>(
		fns: THookCallback<HookCallbackArgs>[],
		caller: (task: THookCallback<HookCallbackArgs>) => void | Promise<void>
	): Promise<void[]> {
		return Promise.all(fns.map(fn => caller(fn)));
	}
}
