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

  onParameterDefinition(): void {
    throw new Error('Method not implemented.');
  }

  onExecute(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
