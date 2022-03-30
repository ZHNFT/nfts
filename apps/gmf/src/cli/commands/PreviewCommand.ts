import { Action } from '@nfts/noddy';

export interface PreviewCommandOptions {
	clean: boolean;
}

export class PreviewCommand extends Action {
	constructor() {
		super({
			actionName: 'preview',
			actionDescription: 'preview preview preview preview'
		});
	}

	protected onParameterDefinition(): void {
		throw new Error('Method not implemented.');
	}

	protected onExecute(): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
