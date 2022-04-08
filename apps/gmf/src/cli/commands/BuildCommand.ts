import { Action } from '@nfts/noddy';
import { FlagOption } from '@nfts/argparser';
import cleanPlugin from '../../internal-plugins/CleanPlugin';
import { BuildHook } from '../../hook';

const BUILD_LIFECYCLE_NAME = 'build';
const BUILD_LIFECYCLE_DESC = 'build build build build';

interface BuildCommandInitOption {
  hook: BuildHook;
}

export class BuildCommand extends Action {
  private readonly hook: BuildHook;
  private _cleanUpDist: FlagOption;

  constructor(initOptions: BuildCommandInitOption) {
    super({
      actionName: BUILD_LIFECYCLE_NAME,
      actionDescription: BUILD_LIFECYCLE_DESC
    });

    this.hook = initOptions.hook;
  }

  protected onParameterDefinition(): void {
    this._cleanUpDist = this.parser.flagOption({
      name: '--clean',
      summary: 'clean clean clean clean',
      callback: () => {
        cleanPlugin.apply(null);
      }
    });
  }

  protected async onExecute(): Promise<void> {
    const parameters = {};

    await this.hook.emitHook('clean', { parameters });
    await this.hook.emitHook('config', { parameters });
    await this.hook.emitHook('build', { parameters });
    await this.hook.emitHook('emit', { parameters });
    await this.hook.emitHook('finished', { parameters });
  }
}
