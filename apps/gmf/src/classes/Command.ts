import { Command } from "@nfts/noddy";
import { FlagParameter, ValueOfParameters } from "@nfts/argparser";
import { Stage } from "./Stage";

export type DefaultCommandParameters = {
  clean: FlagParameter;
  test: FlagParameter;
  watch: FlagParameter;
};

export type DefaultCommandParametersValue =
  ValueOfParameters<DefaultCommandParameters>;

export type CommandParametersValue<R> = DefaultCommandParametersValue | R;

export abstract class GmfBaseCommand
  extends Command
  implements DefaultCommandParameters
{
  private readonly stage!: Stage;

  // Common Parameters For Gmf Command-Line
  clean!: FlagParameter;
  test!: FlagParameter;
  watch!: FlagParameter;

  constructor({
    name,
    description,
    stage,
  }: {
    name: string;
    description: string;
    stage: Stage;
  }) {
    super({
      commandName: name,
      commandDescription: description,
    });

    this.stage = stage;

    this.onDefaultGmfParametersDefinition();
  }

  onDefaultGmfParametersDefinition() {
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
}
