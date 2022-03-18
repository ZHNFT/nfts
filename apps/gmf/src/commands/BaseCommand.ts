import { SubParser, IParserOptionDefinition } from '@ntfs/argparser';

export interface CommandInitOptions {
  name: string;
  usage: string;
}

export default abstract class BaseCommand {
  public readonly parser: SubParser;

  protected constructor({ name, usage }: CommandInitOptions) {
    this.parser = new SubParser({
      name: name,
      description: usage
    });
  }

  addOption(option: IParserOptionDefinition): void {
    this.parser.addOption(option);
  }
}
