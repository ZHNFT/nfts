import { SubParser } from './SubParser';
import { FlagParameter } from '../parameters';

const ROOT_PARSER = 'ROOT_PARSER';
const ROOT_PARSER_DESC = 'ROOT_PARSER_SHOULD_NOT_BE_USED';

export class Parser extends SubParser {
  constructor() {
    super(ROOT_PARSER, ROOT_PARSER_DESC);
  }

  public addHelp(callback: VoidFunction) {
    this.addParam(
      new FlagParameter({
        name: '--help',
        shortName: '-h',
        summary: 'Display help info',
        callback
      })
    );
  }

  public addVersion(callback: VoidFunction) {
    this.addParam(
      new FlagParameter({
        name: '--version',
        shortName: '-v',
        summary: 'Display version',
        callback
      })
    );
  }
}
