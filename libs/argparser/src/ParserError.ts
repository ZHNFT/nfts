/**/

export class ParserError extends Error {
  constructor(msg: string) {
    super(msg);
  }

  static requireOptionError(optionName: string): never {
    throw new ParserError(`Missing required option ${optionName}`);
  }
}
