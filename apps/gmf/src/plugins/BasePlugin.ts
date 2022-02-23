export interface IBasePluginDefinition {
  readonly name: string;
  readonly description: string;
}

export abstract class BasePlugin implements IBasePluginDefinition {
  abstract readonly description: string;
  abstract readonly name: string;

  abstract apply<T extends unknown>(args: T): void;
}
