import { TextRange } from './TextRange';

export enum TokenTypes {
  EndOfSource = 'EndOfSource', // 结束
  Space = 'Space', // 空格
  Text = 'Text', // 普通文本
  LongFlag = 'LongFlag', // 参数标识 --sample
  ShortFlag = 'ShortFlag', // 参数标识 -s
  And = 'And', // &&
  Variable = 'Variable', // 变量 ${ABC}
  Other = 'Other' // 无法解析的Token类型
}

export class Token {
  public readonly kind: keyof typeof TokenTypes;
  public readonly range: TextRange;
  public readonly text?: string;

  public constructor(kind: keyof typeof TokenTypes, range: TextRange, text?: string) {
    this.range = range;
    this.text = text;
    this.kind = kind;
  }

  public toString(): string {
    return this.text?.toString();
  }
}

export class Tokenizer {
  private static _isSpace = (char: string): boolean => /\s/.test(char);

  private readonly _source: string;
  private _sourceIndex: number;

  constructor(input: string) {
    this._source = input;
    this._sourceIndex = 0;
  }

  public readToken(): Token {
    const _currentIndex = this._sourceIndex;
    let _char = this._getChar();

    // 结束
    if (_char === undefined) {
      return new Token(
        TokenTypes.EndOfSource,
        new TextRange(_currentIndex, _currentIndex)
      );
    }

    // 空格
    if (Tokenizer._isSpace(_char)) {
      _char = this._getChar();

      while (Tokenizer._isSpace(_char)) {
        _char = this._getChar();
      }

      // 检查到非空字段，下标-1
      this._sourceIndex -= 1;

      return new Token(TokenTypes.Space, new TextRange(_currentIndex, this._sourceIndex));
    }

    // 标志符号
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

    // && 操作符
    if (_char === '&') {
      _char = this._getChar();
      if (_char == '&') {
        return new Token(
          TokenTypes.And,
          new TextRange(_currentIndex, this._sourceIndex),
          '&&'
        );
      } else {
        if (Tokenizer._isSpace(_char)) {
          this._sourceIndex -= 1;
          return new Token(
            TokenTypes.Other,
            new TextRange(_currentIndex, this._sourceIndex)
          );
        } else {
          throw Error(`常规的参数请避免使用特殊符号开头，参数命名请使用大小写字母开头`);
        }
      }
    }

    // 变量符号
    if (_char === '$') {
      _char = this._getChar();
      if (_char === '{') {
        const _chars = this._getChars('${');
        let _result: RegExpExecArray;
        if ((_result = /^\${(\w+)}$/.exec(_chars))) {
          return new Token(
            TokenTypes.Variable,
            new TextRange(_currentIndex, this._sourceIndex),
            _result[1]
          );
        } else {
          throw Error(
            `变量参数遵循\${VARIABLE_NAME}格式，请检查是否格式错误；[Range(${_currentIndex}, ${this._sourceIndex})]`
          );
        }
      } else {
        // 接空格
        if (Tokenizer._isSpace(_char)) {
          this._sourceIndex -= 1;
          return new Token(
            TokenTypes.Other,
            new TextRange(_currentIndex, this._sourceIndex)
          );
        } else {
          throw Error(
            `变量参数遵循\${VARIABLE_NAME}格式，请检查是否格式错误；[Range(${_currentIndex}, ${this._sourceIndex})]`
          );
        }
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
