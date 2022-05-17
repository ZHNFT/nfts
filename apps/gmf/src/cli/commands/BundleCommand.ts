import { Command } from "@nfts/noddy";
import {
  FlagParameter,
  StringParameter,
  ValueOfParameters,
} from "@nfts/argparser";
import { BundleStage } from "../../stages";

const NAME = "bundle";
const DESCRIPTION = "Run bundle process using extra plugin";

export interface BundleCommandInitOption {
  stage: BundleStage;
}

export type BundleCommandLineParameters = {
  clean: FlagParameter;
  watch: FlagParameter;
  test: FlagParameter;
};

export type BundleCommandLineParametersValue =
  ValueOfParameters<BundleCommandLineParameters>;

export class BundleCommand
  extends Command
  implements BundleCommandLineParameters
{
  readonly stage: BundleStage;

  clean!: FlagParameter;
  watch!: FlagParameter;
  test!: FlagParameter;

  constructor({ stage }: BundleCommandInitOption) {
    super({
      commandName: NAME,
      commandDescription: DESCRIPTION,
    });
    this.stage = stage;
  }

  onDefineParameters(): void {
    this.clean = this.flagParameter({
      name: "--clean",
      summary: "Delete the outputs of all projects.",
    });

    this.watch = this.flagParameter({
      name: "--watch",
      summary: "Watch input files.",
    });

    this.test = this.flagParameter({
      name: "--test",
      summary: "Run all test case, after build.",
    });
  }

  public async onExecute(): Promise<void> {
    const parameters: BundleCommandLineParametersValue = {
      clean: this.clean.value,
      watch: this.watch.value,
      test: this.test.value,
    };

    await this.stage.executeAsync(parameters);
  }
}
