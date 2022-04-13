import { Action } from '@nfts/noddy';
import { FlagOption, StringOption } from '@nfts/argparser';
import { BuildHook } from '../../hook';

const BUILD_LIFECYCLE_NAME = 'build';
const BUILD_LIFECYCLE_DESC = 'build build build build';

interface BuildCommandInitOption {
  hook: BuildHook;
}

export interface BuildCommandLineParameters {
  cleanDist: FlagOption;
  runTest: FlagOption;
  watchMode: FlagOption;
  tsconfig: StringOption;
  production: FlagOption;
}

export interface BuildCommandLineParametersValue {
  cleanDist?: boolean;
  runTest?: boolean;
  watchMode?: boolean;
  tsconfig?: string;
  production?: boolean;
}

export class BuildCommand extends Action implements BuildCommandLineParameters {
  readonly hook: BuildHook;

  cleanDist: FlagOption;
  runTest: FlagOption;
  watchMode: FlagOption;
  tsconfig: StringOption;
  production: FlagOption;

  constructor(initOptions: BuildCommandInitOption) {
    super({
      actionName: BUILD_LIFECYCLE_NAME,
      actionDescription: BUILD_LIFECYCLE_DESC
    });

    this.hook = initOptions.hook;
  }

  protected onParameterDefinition(): void {
    this.cleanDist = this.parser.flagOption({
      name: '--clean',
      summary: 'Clean up dist folder before build process'
    });

    this.runTest = this.parser.flagOption({
      name: '--runTest',
      summary: 'Run test case after build process'
    });

    this.watchMode = this.parser.flagOption({
      name: '--watch',
      summary: 'Watch build process'
    });

    this.tsconfig = this.parser.stringOption({
      name: '--tsconfig',
      summary: 'Path to tsconfig.json'
    });

    this.production = this.parser.flagOption({
      name: '--production',
      summary: 'Run in production mode'
    });
  }

  protected async onExecute(): Promise<void> {
    const parameters: BuildCommandLineParametersValue = {
      cleanDist: this.cleanDist.value,
      runTest: this.runTest.value,
      watchMode: this.watchMode.value,
      tsconfig: this.tsconfig.value
    };

    await this.hook._call(parameters);
  }
}
