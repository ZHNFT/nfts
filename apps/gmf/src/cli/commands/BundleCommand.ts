import { Command } from '@nfts/noddy';
import { FlagParameter, StringParameter } from '@nfts/argparser';
import { BundleStage } from '../../stages/BundleStage';

const NAME = 'bundle';
const DESCRIPTION = 'Run bundle process using extra plugin';

export interface BundleCommandInitOption {
  stage: BundleStage;
}

export interface BundleCommandLineParameters {
  clean: FlagParameter;
  watch: FlagParameter;
  config: StringParameter;
}

export interface BundleCommandLineParametersValue {
  clean?: boolean;
  watch?: boolean;
  config?: string;
}

export class BundleCommand extends Command implements BundleCommandLineParameters {
  readonly stage: BundleStage;

  clean: FlagParameter;
  watch: FlagParameter;
  config: StringParameter;

  constructor({ stage }: BundleCommandInitOption) {
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

    this.watch = this.flagParameter({
      name: '--watch',
      summary: 'Watch input files.'
    });

    this.config = this.stringParameter({
      name: '--config',
      summary: 'Specified webpack configuration file path'
    });
  }

  public async onExecute(): Promise<void> {
    const parameters: BundleCommandLineParametersValue = {
      clean: this.clean.value,
      watch: this.watch.value,
      config: this.config.value
    };

    await this.stage.executeAsync(parameters);
  }
}
