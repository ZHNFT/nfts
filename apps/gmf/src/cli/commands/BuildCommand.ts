import { Action } from '@nfts/noddy';
import cleanPlugin from '../../internal-plugins/CleanPlugin';

export class BuildCommand extends Action {
  constructor() {
    super({
      actionName: 'build',
      actionDescription: 'build build build build'
    });
  }

  protected onParameterDefinition(): void {
    this.parser.flagOption({
      name: '--clean',
      summary: 'clean clean clean clean',
      callback: () => {
        cleanPlugin.apply(null);
      }
    });
  }

  protected async onExecute(): Promise<void> {
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
