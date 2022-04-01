import { Action } from '@nfts/noddy';
import cleanPlugin from '../../internal-plugins/CleanPlugin';
import { BuildHook } from '../../hook';

const BUILD_LIFECYCLE_NAME = 'build';
const BUILD_LIFECYCLE_DESC = 'build build build build';

interface BuildCommandInitOption {
  hook: BuildHook;
}

export class BuildCommand extends Action {
  private readonly hook: BuildHook;

  constructor(initOptions: BuildCommandInitOption) {
    super({
      actionName: BUILD_LIFECYCLE_NAME,
      actionDescription: BUILD_LIFECYCLE_DESC
    });

    this.hook = initOptions.hook;
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

    await this.hook.emitHook('pre', { parameters });
    // await this._lifecycle.emitHook('run', this._ctx);
    // await this._lifecycle.emitHook('finished', this._ctx);
  }
}
