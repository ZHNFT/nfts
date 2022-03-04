import { IOptionDefinition, Option } from '@ntfs/argparser';

export type ICommandLineOptionDefinition = IOptionDefinition;

export abstract class CommandOption implements ICommandLineOptionDefinition {
  readonly description: string;
  readonly name: string;
  readonly required: boolean;

  protected constructor(definition: ICommandLineOptionDefinition) {
    this.name = definition.name;
    this.description = definition.description;
    this.required = definition.required;

    if (!Option.maybeOption(this.name)) {
      throw new Error(
        `Option ${this.name} is not a valid option name; Support: -x/--xxx`
      );
    }
  }
}
