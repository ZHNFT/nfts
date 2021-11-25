export type ActionFunc<T> = (args: T) => void;

export interface ICommandAction<T> {
	name: string;
	action: ActionFunc<T>;

	applyAction(ctx: T): void;
}

export class CommandAction<T> implements ICommandAction<T> {
	name: string;
	action: ActionFunc<T>;

	constructor(name: string, action: ActionFunc<T>) {
		this.name = name;
		this.action = action;
	}

	applyAction(ctx: T) {
		this.action.call(this, ctx);
	}
}
