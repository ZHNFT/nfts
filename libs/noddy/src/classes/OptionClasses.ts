import { TOptionKind, OptionKinds } from '../Constants';
import { IBaseOption } from '@ntfs/argparser';

export interface IBaseOptionDefinition extends IBaseOption {
  kind?: TOptionKind;
  alternatives?: string[];
  alias?: string;
}

export interface IBaseStringOptionDefinition extends IBaseOptionDefinition {
  defaultValue?: string;
}

export interface IBaseBooleanOptionDefinition extends IBaseOptionDefinition {
  defaultValue?: boolean;
}

export interface IBaseChoicesOptionDefinition extends IBaseOptionDefinition {
  alternatives: string[];
  defaultValue?: string;
}

export interface IBaseArrayOptionDefinition extends IBaseOptionDefinition {
  defaultValue?: string[];
}

export type TOptionDefinition =
  | IBaseStringOptionDefinition
  | IBaseBooleanOptionDefinition
  | IBaseChoicesOptionDefinition
  | IBaseArrayOptionDefinition;

export abstract class Option implements IBaseOptionDefinition {
  readonly name: string;
  readonly description: string;

  readonly alias?: string;
  readonly alternatives?: string[];
  abstract kind?: TOptionKind;

  private static isValidOptionName = (name: string): boolean =>
    /^-{1,2}([a-z-]+)/.test(name);

  constructor(definition: IBaseOptionDefinition) {
    this.name = definition.name;
    this.alias = definition.alias;
    this.description = definition.description;
    this.alternatives = definition.alternatives;

    if (!Option.isValidOptionName(definition.name)) {
      throw Error(`Not a valid option name ${definition.name};`);
    }

    if (definition.kind === OptionKinds.Choices) {
      if (definition.alternatives?.length < 1) {
        throw Error(
          'Choices type option [' +
            definition.name +
            '] need alternatives but received undefined'
        );
      }
    }
  }
}

export class StringOption extends Option implements IBaseStringOptionDefinition {
  get kind(): TOptionKind {
    return OptionKinds.String;
  }

  constructor({ name, description }: IBaseStringOptionDefinition) {
    super({
      name,
      description
    });
  }
}

export class BooleanOption extends Option implements IBaseBooleanOptionDefinition {
  readonly value?: boolean;

  get kind(): TOptionKind {
    return OptionKinds.Boolean;
  }
}

export class ChoicesOption extends Option implements IBaseChoicesOptionDefinition {
  readonly value?: string;
  alternatives: string[];

  get kind(): TOptionKind {
    return OptionKinds.Choices;
  }
}

export class ArrayOption extends Option implements IBaseArrayOptionDefinition {
  readonly value?: string[];

  get kind(): TOptionKind {
    return OptionKinds.Array;
  }
}
