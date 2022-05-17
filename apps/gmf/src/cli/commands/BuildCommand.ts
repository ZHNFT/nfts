import { Command } from "@nfts/noddy";
import { FlagParameter, ValueOfParameters } from "@nfts/argparser";
import { BuildStage } from "../../stages";

const NAME = "build";
const DESCRIPTION = "Run build process";

export interface BuildCommandInitOption {
  stage: BuildStage;
}

export type BuildCommandLineParameters = {
  readonly clean: FlagParameter;
  readonly test: FlagParameter;
  readonly watch: FlagParameter;
};

export type BuildCommandLineParametersValue =
  ValueOfParameters<BuildCommandLineParameters>;

export class BuildCommand
  extends Command
  implements BuildCommandLineParameters
{
  private readonly stage: BuildStage;

  clean!: FlagParameter;
  test!: FlagParameter;
  watch!: FlagParameter;

  constructor({ stage }: BuildCommandInitOption) {
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

    this.test = this.flagParameter({
      name: "--test",
      summary: "Run all test case, after build.",
    });

    this.watch = this.flagParameter({
      name: "--watch",
      summary: "Watch input files.",
    });
  }

  public async onExecute(): Promise<void> {
    const parameters: BuildCommandLineParametersValue = {
      clean: this.clean.value,
      test: this.test.value,
      watch: this.watch.value,
    };

    await this.stage.executeAsync(parameters);
  }
}
