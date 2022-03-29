import CleanPlugin from '../plugins/CleanPlugin';
import { ActionBase } from '../classes/ActionBase';

export default class BuildCommand extends ActionBase {
  constructor() {
    super({
      actionName: 'build',
      actionDescription: 'buildbuildbuildbuild'
    });
  }

  onParameterDefinition(): void {
    this.parser.flagOption({
      name: '--clean',
      summary: 'cleancleancleanclean',
      callback: () => new CleanPlugin().apply(this._ctx)
    });
  }

  async onExecute(): Promise<void> {
    const parameters = {};

    for (let index = 0; index < this.parser.options.length; index++) {
      const option = this.parser.options[index];
      parameters[option.strippedName()] = option.value;
    }

    await this._lifecycle.emitHook('pre', this._ctx);

    return Promise.resolve();
  }
}
