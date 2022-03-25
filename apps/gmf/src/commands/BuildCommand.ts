import CleanPlugin from '../plugins/CleanPlugin';
import { ActionBase } from '../classes/ActionBase';

export default class BuildCommand extends ActionBase {
  constructor() {
    super({
      actionName: 'build',
      actionDescription: '.....'
    });
  }

  onParameterDefinition(): void {
    this.flagParameter({
      name: '--clean',
      usage: 'clean clean clean clean',
      required: false,
      callback: () => new CleanPlugin().apply(this._ctx)
    });
  }

  async onExecute(): Promise<void> {
    const parameters = {};

    for (let index = 0; index < this.parameters.length; index++) {
      const element = this.parameters[index];
      parameters[element.strippedName] = element.value;
    }

    await this._lifecycle.emitHook('pre', this._ctx);

    return Promise.resolve();
  }
}
