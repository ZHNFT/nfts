import { Token, TokenTypes } from './Token';
import { TextRange } from './TextRange';

export class Tokenizer {
  private static _isSpace = (char: string): boolean => /\s/.test(char);

  private readonly _source: string;
  private _sourceIndex: number;

  constructor(input: string) {
    this._source = input;
  }

  public readToken(): Token {
    const _currentIndex = this._sourceIndex;
    let _char = this._getChar();

    if (_char === undefined) {
      return new Token(
        TokenTypes.EndOfSource,
        new TextRange(_currentIndex, _currentIndex)
      );
    }

    if (Tokenizer._isSpace(_char)) {
      _char = this._getChar();

      while (Tokenizer._isSpace(_char)) {
        _char = this._getChar();
      }

      // 检查到非空字段，下标-1
      this._sourceIndex -= 1;

      return new Token(TokenTypes.Space, new TextRange(_currentIndex, this._sourceIndex));
    }

    if (_char === '-') {
      _char = this._getChar();
      // LongFlag
      if (_char === '-') {
        const flagName = this._getChars('--');
        return new Token(
          TokenTypes.LongFlag,
          new TextRange(_currentIndex, this._sourceIndex),
          flagName
        );
      } else {
        const flagName = this._getChars(`-${_char}`);
        return new Token(
          TokenTypes.ShortFlag,
          new TextRange(_currentIndex, this._sourceIndex),
          flagName
        );
      }
    }

    const chars = this._getChars(_char);

    return new Token(
      TokenTypes.Text,
      new TextRange(_currentIndex, this._sourceIndex),
      chars
    );
  }

  public readTokens(): Token[] {
    const tokens: Token[] = [];
    this._sourceIndex = 0;
    let token = this.readToken();

    while (token.kind !== TokenTypes.EndOfSource) {
      tokens.push(token);
      token = this.readToken();
    }

    return tokens;
  }

  private _getChar() {
    return this._source[this._sourceIndex++];
  }

  private _getChars(char: string): string {
    let chars = '';

    while (!/\s/.test(char)) {
      if (!char) {
        break;
      }
      chars += char;
      char = this._getChar();
    }

    this._sourceIndex -= 1;
    return chars;
  }
}
