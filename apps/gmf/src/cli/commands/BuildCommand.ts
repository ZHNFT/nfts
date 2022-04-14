import { Action } from '@nfts/noddy';
import { FlagOption, StringOption } from '@nfts/argparser';
import { BuildHook } from '../../hook';

const BUILD_LIFECYCLE_NAME = 'build';
const BUILD_LIFECYCLE_DESC = 'Run build process';

export interface BuildCommandInitOption {
  hook: BuildHook;
}

export interface BuildCommandLineParameters {
  clean: FlagOption;
  test: FlagOption;
  watchMode: FlagOption;
  tsconfig: StringOption;
  production: FlagOption;
}

export interface BuildCommandLineParametersValue {
  clean?: boolean;
  test?: boolean;
  watchMode?: boolean;
  tsconfig?: string;
  production?: boolean;
}

export class BuildCommand extends Action implements BuildCommandLineParameters {
  readonly hook: BuildHook;

  clean: FlagOption;
  test: FlagOption;
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
    this.clean = this.parser.flagOption({
      name: '--clean',
      summary: 'Clean up dist folder before build process'
    });

    this.test = this.parser.flagOption({
      name: '--test',
      summary: 'Run build process'
    });

    this.watchMode = this.parser.flagOption({
      name: '--watch',
      summary: 'Start up a watch compilation'
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
      clean: this.clean.value,
      test: this.test.value,
      watchMode: this.watchMode.value,
      tsconfig: this.tsconfig.value
    };

    await this.hook._call(parameters);
  }
}
