import { IArgumentDefinition, IOptionDefinition, Argument } from '@ntfs/argparser';

export interface ICommandArgumentDefinition extends IArgumentDefinition {}

export abstract class CommandArgument implements ICommandArgumentDefinition {
  readonly description: string;
  readonly name: string;
  readonly _arg: Argument;

  constructor(definition: IArgumentDefinition) {
    this.name = definition.name;
    this.description = definition.description;
    this._arg = new Argument({
      name: definition.name,
      description: definition.description
    });
  }

  option(definition: IOptionDefinition) {
    this._arg.option(definition);
  }

  abstract exec(args: unknown): void;
}
