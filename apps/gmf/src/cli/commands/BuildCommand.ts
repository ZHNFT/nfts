import { Command } from '@nfts/noddy';
import { FlagParameter, StringParameter } from '@nfts/argparser';
import { BuildHook } from '../../hook';

const BUILD_LIFECYCLE_NAME = 'build';
const BUILD_LIFECYCLE_DESC = 'Run build process';

export interface BuildCommandInitOption {
  hook: BuildHook;
}

export interface BuildCommandLineParameters {
  clean: FlagParameter;
  test: FlagParameter;
  watchMode: FlagParameter;
  tsconfig: StringParameter;
  production: FlagParameter;
}

export interface BuildCommandLineParametersValue {
  clean?: boolean;
  test?: boolean;
  watchMode?: boolean;
  tsconfig?: string;
  production?: boolean;
}

export class BuildCommand extends Command implements BuildCommandLineParameters {
  readonly hook: BuildHook;

  clean: FlagParameter;
  test: FlagParameter;
  watchMode: FlagParameter;
  tsconfig: StringParameter;
  production: FlagParameter;

  constructor({ hook }: BuildCommandInitOption) {
    super({
      commandName: BUILD_LIFECYCLE_NAME,
      commandDescription: BUILD_LIFECYCLE_DESC
    });

    this.hook = hook;
  }

  onDefineParameters(): void {
    this.clean = this.flagParameter({
      name: '--clean',
      summary: 'Clean up dist folder before build process'
    });

    this.test = this.flagParameter({
      name: '--test',
      summary: 'Run build process'
    });

    this.watchMode = this.flagParameter({
      name: '--watch',
      summary: 'Start up a watch compilation'
    });

    this.tsconfig = this.stringParameter({
      name: '--tsconfig',
      summary: 'Path to tsconfig.json'
    });

    this.production = this.flagParameter({
      name: '--production',
      summary: 'Run in production mode'
    });
  }

  public async onExecute(): Promise<void> {
    const parameters: BuildCommandLineParametersValue = {
      clean: this.clean.value,
      test: this.test.value,
      watchMode: this.watchMode.value,
      tsconfig: this.tsconfig.value
    };

    await this.hook._call(parameters);
  }
}
