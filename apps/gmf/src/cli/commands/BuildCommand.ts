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
  watch: FlagParameter;
  tsconfig: StringParameter;
  production: FlagParameter;
  snowpack: FlagParameter;
}

export interface BuildCommandLineParametersValue {
  clean?: boolean;
  test?: boolean;
  watch?: boolean;
  tsconfig?: string;
  production?: boolean;
  snowpack?: boolean;
}

export class BuildCommand extends Command implements BuildCommandLineParameters {
  readonly hook: BuildHook;

  clean: FlagParameter;
  test: FlagParameter;
  watch: FlagParameter;
  tsconfig: StringParameter;
  production: FlagParameter;
  snowpack: FlagParameter;

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

    this.watch = this.flagParameter({
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

    this.snowpack = this.flagParameter({
      name: '--snowpack',
      summary: 'Run development using snowpack'
    });
  }

  public async onExecute(): Promise<void> {
    const parameters: BuildCommandLineParametersValue = {
      clean: this.clean.value,
      test: this.test.value,
      watch: this.watch.value,
      tsconfig: this.tsconfig.value,
      snowpack: this.snowpack.value
    };
    await this.hook._call(parameters);
  }
}
