export interface IBasePluginDefinition {
  readonly name: string;
  readonly description: string;
}

export abstract class BasePlugin implements IBasePluginDefinition {
  readonly description: string;
  readonly name: string;

  protected constructor({ name, description }: IBasePluginDefinition) {
    this.name = name;
    this.description = description;
  }

  abstract apply<T extends unknown>(args: T): void;
}
