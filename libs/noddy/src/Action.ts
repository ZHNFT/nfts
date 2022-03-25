import { SubParser, IParserOptionDefinition, TOption } from '@nfts/argparser';
import Parameters from './Parameters';

export interface IActionInitOptions {
  actionName: string;
  actionDescription: string;
}

export default abstract class Action extends Parameters {
  private readonly _subParser: SubParser;

  protected constructor(options: IActionInitOptions) {
    super();
    this._subParser = new SubParser({
      name: options.actionName,
      description: options.actionDescription
    });
    this.onParameterDefinition();
  }
  public get actionName(): string {
    return this._subParser.name;
  }
  public get actionDescription(): string {
    return this._subParser.description;
  }
  public get actionParser(): SubParser {
    return this._subParser;
  }
  private _addParameter(definition: IParserOptionDefinition): TOption {
    const param = this._subParser.addOption(definition);
    super.addParameter(param);
    return param;
  }
  abstract onParameterDefinition(): void;
  abstract onExecute(): Promise<void>;

  public stringParameter(definition: Omit<IParserOptionDefinition, 'type'>): TOption {
    return this._addParameter({
      ...definition,
      type: 'String'
    });
  }

  public flagParameter(definition: Omit<IParserOptionDefinition, 'type'>): TOption {
    return this._addParameter({
      ...definition,
      type: 'Flag'
    });
  }

  public choicesParameter(definition: Omit<IParserOptionDefinition, 'type'>): TOption {
    return this._addParameter({
      ...definition,
      type: 'Choices'
    });
  }
}
