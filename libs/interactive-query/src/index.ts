export enum QueryTypes {
	boolean = 'boolean',
	choices = 'choices'
}

export type TQueryTypes = keyof typeof QueryTypes;

export interface IQueryOption {
	summary: string;
	type: TQueryTypes;
}

export abstract class QueryPlugin {
	abstract apply(): void;
}

export class Query {
	public static hookIndex = 0;
	public static hooks = [];
	public static hookCallbacks = [];

	addPlugin(plugin: QueryPlugin) {
		//
	}
}

const _plugins = [];

export type TPlugin = () => void;

export const plugin = (plugin: TPlugin): void => {
	_plugins.push(plugin);
};

type TValueGenerator<T extends unknown> = (prev?: T) => T;

export function useState<T extends unknown>(
	defaultValue?: T | TValueGenerator<T>
): [value: T, updater: (newValue: T) => T] {
	Query.hooks.push(defaultValue);
	Query.hookCallbacks.push(undefined);

	return [
		Query.hooks[Query.hookIndex] as T,
		(newValue): T => {
			if (typeof newValue === 'function') {
				return newValue(Query.hooks[Query.hookIndex] as T) as T;
			}

			Query.hookIndex++;
			return newValue;
		}
	];
}

export function useEffect(effectHandle: () => VoidFunction, deps?: unknown[]): void {
	Query.hooks.push(effectHandle);
	Query.hookCallbacks.push(effectHandle());
}
