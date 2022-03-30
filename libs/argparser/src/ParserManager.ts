import { ParserDefinition } from './provider/ParserProvider';
import { OptionsManager } from './OptionsManager';

export class ParserManager extends OptionsManager {
  readonly name: string;
  readonly description: string;
  readonly callback?: (args: unknown) => void | Promise<void>;

  parent: ParserManager;
  subParsers: ParserManager[] = [];

  constructor(definition: ParserDefinition) {
    super();

    this.name = definition.name;
    this.callback = definition.callback;
    this.description = definition.description;
  }

  public addSubParser(parser: ParserManager): ParserManager {
    parser.parent = this;
    this.subParsers.push(parser);

    return this;
  }

  public findParser(name: string): ParserManager | undefined {
    return this.subParsers.find(parser => parser.name === name);
  }
}
