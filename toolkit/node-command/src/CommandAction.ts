export interface ICommandAction<T> {
	name: string;
	action: Function;

	applyAction(ctx: T): void;
}

export class CommandAction<T> implements ICommandAction<T> {
	name: string;
	action: Function;

	constructor(name: string, action: Function) {
		this.name = name;
		this.action = action;
	}

	applyAction(ctx: T) {
		this.action.call(this, ctx);
	}
}
