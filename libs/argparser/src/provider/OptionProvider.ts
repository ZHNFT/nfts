export enum OptionTypes {
  Array = 'Array',
  String = 'String',
  Flag = 'Flag'
}

export interface OptionDefinition {
  readonly name: string;
  readonly type: string;
  readonly summary: string;
  readonly required?: boolean;
  readonly callback?: (args: unknown) => void;
}

export abstract class OptionProvider implements OptionDefinition {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly summary: string;
  readonly callback: (args: unknown) => void;

  protected constructor(definition: OptionDefinition) {
    this.name = definition.name;
    this.type = definition.type;
    this.required = definition.required;
    this.callback = definition.callback;
    this.summary = definition.summary;

    if (!OptionProvider.validOptionName(this.name)) {
      throw new Error(
        `Illegal option name "${this.name}"` + `expect option name start with "-" or "--"`
      );
    }
  }

  public strippedName(): string {
    return this.name.replace(/^-{1,2}/, '');
  }

  private static validOptionName(input: string): boolean {
    return /^-{1,2}([\w_]+)/.test(input);
  }
}
