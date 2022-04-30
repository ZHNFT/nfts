import { Command } from '@nfts/noddy';
import { FlagParameter } from '@nfts/argparser';
import { BundleStage } from '../../stages/BundleStage';

const NAME = 'bundle';
const DESCRIPTION = 'Run bundle process using extra plugin';

export interface BundleCommandInitOption {
  stage: BundleStage;
}

export interface BundleCommandLineParameters {
  clean: FlagParameter;
  watch: FlagParameter;
}

export interface BundleCommandLineParametersValue {
  clean?: boolean;
  watch?: boolean;
}

export class BundleCommand extends Command implements BundleCommandLineParameters {
  readonly stage: BundleStage;

  clean: FlagParameter;
  watch: FlagParameter;

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
  }

  public async onExecute(): Promise<void> {
    const parameters: BundleCommandLineParametersValue = {
      clean: this.clean.value,
      watch: this.watch.value
    };

    await this.stage.executeAsync(parameters);
  }
}
