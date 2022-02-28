import { Parser } from './Parser';
import { Tokenizer } from './Tokenizer';
export class Shell {
  _parser: Parser;

  _tokenizer: Tokenizer;

  constructor() {
    this._parser = new Parser();
    this._tokenizer = new Tokenizer();
  }
}
