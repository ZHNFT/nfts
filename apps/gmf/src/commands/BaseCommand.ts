import { SubParser, IParserOptionDefinition } from '@ntfs/argparser';

export default abstract class BaseCommand {
  protected readonly _parser: SubParser;

  protected constructor() {
    this._parser = new SubParser({
      name: 'build',
      description: 'Build command'
    });
  }

  addOption(option: IParserOptionDefinition) {
    this._parser.addOption(option);
  }
}
