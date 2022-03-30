import { Parser, TOption, SubParser } from '@nfts/argparser';

export interface IActionInitOptions {
  actionName: string;
  actionDescription: string;
}

export default abstract class Action {
  public readonly parser: SubParser;

  protected constructor(definition: IActionInitOptions) {
    this.parser = new SubParser({
      name: definition.actionName,
      description: definition.actionDescription,
      callback: async () => await this.onExecute()
    });

    this.onParameterDefinition();
  }

  protected abstract onParameterDefinition(): void;
  protected abstract onExecute(): Promise<void>;
}
