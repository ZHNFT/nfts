import { Action } from '@nfts/noddy';
import { FlagOption } from '@nfts/argparser';
import { BuildHook } from '../../hook';

const BUILD_LIFECYCLE_NAME = 'build';
const BUILD_LIFECYCLE_DESC = 'build build build build';

interface BuildCommandInitOption {
  hook: BuildHook;
}

export class BuildCommand extends Action {
  private readonly hook: BuildHook;
  private _cleanDist: FlagOption;
  private _runTest: FlagOption;

  constructor(initOptions: BuildCommandInitOption) {
    super({
      actionName: BUILD_LIFECYCLE_NAME,
      actionDescription: BUILD_LIFECYCLE_DESC
    });

    this.hook = initOptions.hook;
  }

  protected onParameterDefinition(): void {
    this._cleanDist = this.parser.flagOption({
      name: '--clean',
      summary: 'Clean up dist folder before build process'
    });

    this._runTest = this.parser.flagOption({
      name: '--runTest',
      summary: 'Run test case after build process'
    });
  }

  protected async onExecute(): Promise<void> {
    const parameters = {
      cleanDist: this._cleanDist.value,
      runTest: this._runTest.value
    };

    if (parameters.cleanDist) {
      await this.hook.emitHook('clean', { parameters });
    }

    await this.hook.emitHook('config', { parameters });
    await this.hook.emitHook('build', { parameters });
    await this.hook.emitHook('emit', { parameters });
    await this.hook.emitHook('finished', { parameters });
  }
}
