import { Action } from '@nfts/noddy';

export interface PreviewCommandOptions {
  clean: boolean;
}

export default class PreviewCommand extends Action {
  constructor() {
    super({
      actionName: 'preview',
      actionDescription: 'preview...'
    });
  }

  onParameterDefinition(): void {
    throw new Error('Method not implemented.');
  }

  onExecute(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
