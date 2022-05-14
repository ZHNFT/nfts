import { SubParser } from './SubParser';
import { FlagParameter } from '../parameters';

// const ROOT_PARSER = 'ROOT_PARSER';
// const ROOT_PARSER_DESC = 'ROOT_PARSER_SHOULD_NOT_BE_USED';

export class Parser extends SubParser {
  constructor({ name, description }: { name: string; description: string }) {
    super(name, description);
  }

  public addHelp(callback: () => void) {
    this.addParam(
      new FlagParameter({
        name: '--help',
        shortName: '-h',
        summary: 'Display help info',
        callback
      })
    );
  }

  public addVersion() {
    this.addParam(
      new FlagParameter({
        name: '--version',
        shortName: '-v',
        summary: 'Display version'
      })
    );
  }
}
