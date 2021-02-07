import { WriteStream, ReadStream } from "tty";
import * as readline from "readline";
import { makeHook } from "./hook";

export type Config = {
	input: ReadStream;
	output: WriteStream;
};

export type Prompt = (config: Config) => void;

type Status = "idle" | "pending" | "loading" | "finished";
type EffectsDeps = string[];
type UseStateHandler<T> = (val: T) => void;

export type Hook<T> = {
	value?: T;
	status?: Status;
	onLine?: () => void;
	onEnter?: () => void;
	useEffectCallback?: (val: T) => void;
	useEffectDeps?: EffectsDeps;
	id?: number;
	[index: string]: unknown;
};
export type Hooks = Hook<unknown>[];
export type HookCleaup = () => void;
export type HookCleaups = HookCleaup[];

const HOOKS: Hooks = [];
const HOOKS_CLEANUP: HookCleaups = [];

const CurrentHook: Hook<unknown> | null = null;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultOnLine = () => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultOnEnter = () => {};

const makeHook = <T>(config: Hook<T>): Hook<T> => {
	return {
		onEnter: defaultOnEnter,
		onLine: defaultOnLine,
		...config,
	};
};

export const useState = <T>(
	initialState: T
): [value: T, handler: UseStateHandler<T>] => {
	const hook = makeHook<T>({
		value: initialState,
	});

	hook.id = HOOKS.push(hook);

	return [hook.value, (val: T) => {}];
};

export const useEffect = <T>(
	callback: (val: T) => void,
	deps: EffectsDeps
): HookCleaup => {
	const hook = makeHook<T>({
		useEffectCallback: callback,
		useEffectDeps: deps,
	});
	hook.id = HOOKS.push(hook);

	const cleanup = () => {
		for (let i = HOOKS.length - 1; i >= 0; i--) {
			if (i === hook.id) {
				HOOKS.slice(i - 1, i);
				break;
			}
		}
	};

	HOOKS_CLEANUP[hook?.id] = cleanup;

	return () => {
		// evaluate after finished
		cleanup();
	};
};

export const useKeypress = () => {};

export const destory = (cb) => {};

export const makePrompt = (render): Prompt => {
	return (config: Config) => {
		const { input, output } = config;

		const defaultInput = process.stdin;
		const defaultOutput = process.stdout;

		const rl = readline.createInterface({
			input: input || defaultInput,
			output: output || defaultOutput,
			terminal: true,
		});
	};
};
