import { Action } from '@nfts/noddy';

export interface TestCommandOptions {
	clean: boolean;
}

export class TestCommand extends Action {
	constructor() {
		super({
			actionName: 'test',
			actionDescription: 'test...'
		});
	}

	protected onParameterDefinition(): void {
		throw new Error('Method not implemented.');
	}

	protected onExecute(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
