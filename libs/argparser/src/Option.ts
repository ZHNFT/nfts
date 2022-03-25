export interface IOptionDefinition {
  readonly name: string;
  readonly description: string;
  readonly required?: boolean;
  readonly alias?: string;
  readonly belong?: string;
  readonly alternatives?: string[];
}

export type TOptionValue = string | boolean | number | undefined;

export class Option implements IOptionDefinition {
  readonly name: string;
  readonly description: string;
  readonly belong: string;
  readonly required: boolean;

  readonly alias?: string;
  readonly alternatives?: string[];

  public static maybeOption(optionName: string): boolean {
    return /^-{1,2}([a-z-]+)/.test(optionName);
  }

  /*
   * 移除option前带的中横线前缀
   * */
  public strippedName(): string {
    return /^-{1,2}([a-z-]+)/.exec(this.name)[1];
  }

  constructor({
    name,
    description,
    belong,
    required,
    alias,
    alternatives
  }: IOptionDefinition) {
    this.name = name;
    this.alias = alias;
    this.belong = belong;
    this.required = required;
    this.description = description;
    this.alternatives = alternatives;
  }
}
