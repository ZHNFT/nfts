import { Action } from '@ntfs/noddy';

export default class BuildCommand extends Action {
  constructor() {
    super({
      actionName: 'build',
      actionDescription: '.....'
    });
  }

  onParameterDefinition(): void {
    this.stringParameter({
      name: '--demo',
      usage: 'demo demo demo demo',
      required: false
    });
  }

  onExecute(): Promise<void> {
    for (let index = 0; index < this.parameters.length; index++) {
      const element = this.parameters[index];
      console.log(element.strippedName, element.value);
    }

    return Promise.resolve();
  }
}
