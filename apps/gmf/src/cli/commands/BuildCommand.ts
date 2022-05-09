import { Command } from '@nfts/noddy';
import { FlagParameter, StringParameter } from '@nfts/argparser';
import { BuildStage } from '../../stages';

const NAME = 'build';
const DESCRIPTION = 'Run build process';

export interface BuildCommandInitOption {
  stage: BuildStage;
}

export interface BuildCommandLineParameters {
  clean: FlagParameter;
  test: FlagParameter;
  watch: FlagParameter;
  tsconfig: StringParameter;
}

export interface BuildCommandLineParametersValue {
  clean?: boolean;
  test?: boolean;
  watch?: boolean;
  tsconfig?: string;
}

export class BuildCommand extends Command implements BuildCommandLineParameters {
  readonly stage: BuildStage;

  clean: FlagParameter;
  test: FlagParameter;
  watch: FlagParameter;
  tsconfig: StringParameter;

  constructor({ stage }: BuildCommandInitOption) {
    super({
      commandName: NAME,
      commandDescription: DESCRIPTION
    });

    this.stage = stage;
  }

  onDefineParameters(): void {
    this.clean = this.flagParameter({
      name: '--clean',
      summary: 'Delete the outputs of all projects.'
    });

    this.test = this.flagParameter({
      name: '--test',
      summary: 'Run all test case, after build.'
    });

    this.watch = this.flagParameter({
      name: '--watch',
      summary: 'Watch input files.'
    });

    this.tsconfig = this.stringParameter({
      name: '--tsconfig',
      summary: `Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.`
    });
  }

  public async onExecute(): Promise<void> {
    const parameters: BuildCommandLineParametersValue = {
      clean: this.clean.value,
      test: this.test.value,
      watch: this.watch.value,
      tsconfig: this.tsconfig.value
    };

    await this.stage.executeAsync(parameters);
  }
}
