import { ICommandAction } from '@/CommandAction';

export type IActionConfig = {
	name: string;
};

export interface ICommand<T> {
	readonly commandName: string;
	readonly commandActions: Map<string, ICommandAction<T>>;

	addAction(name: string, action: ICommandAction<T>): void;
	getAction(actionName: string): ICommandAction<T>;

	// addActionFromConfig(config: IActionConfig): void;
}

export class Command<T> implements ICommand<T> {
	commandName: string;
	commandActions: Map<string, ICommandAction<T>>;

	getAction(actionName: string) {
		return this.commandActions.get(actionName);
	}

	addAction(name: string, action: ICommandAction<T>) {
		this.commandActions.set(name, action);
	}

	// addActionFromConfig(actionConfig: IActionConfig) {}
}
