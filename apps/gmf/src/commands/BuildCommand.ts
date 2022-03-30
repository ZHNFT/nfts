import { Action } from '@nfts/noddy';
import CleanPlugin from '../internal-plugins/CleanPlugin';

export default class BuildCommand extends Action {
  constructor() {
    super({
      actionName: 'build',
      actionDescription: 'buildbuildbuildbuild'
    });
  }

  public onParameterDefinition(): void {
    this.parser.flagOption({
      name: '--clean',
      summary: 'clean clean clean clean',
      callback: () => new CleanPlugin().apply(null)
    });
  }

  async onExecute(): Promise<void> {
    const parameters = {};

    for (let index = 0; index < this.parser.options.length; index++) {
      const option = this.parser.options[index];
      parameters[option.strippedName()] = option.value;
    }

    await Promise.resolve();
    // await this._lifecycle.emitHook('pre', this._ctx);
    // await this._lifecycle.emitHook('run', this._ctx);
    // await this._lifecycle.emitHook('finished', this._ctx);
  }
}
