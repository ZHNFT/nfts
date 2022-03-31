import { Action } from '@nfts/noddy';
import cleanPlugin from '../../internal-plugins/CleanPlugin';

const BUILD_LIFECYCLE_NAME = 'build';
const BUILD_LIFECYCLE_DESC = 'build build build build';

export class BuildCommand extends Action {
  constructor() {
    super({
      actionName: BUILD_LIFECYCLE_NAME,
      actionDescription: BUILD_LIFECYCLE_DESC
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
