import Token, { TTokenPos } from './ast/Token';
import { ParserResult } from './ParserResult';
import { FlagNameRegex, TokenKind } from './Constants';

/* 参数定义 */
export interface TParamDefinition {
  flagName: string;
  desc: string;
  required?: boolean;
}

/* define Parser shape */
export abstract class ParserProvider {
  /*
   * 大小写敏感
   * */
  public abstract caseSensitive: boolean;
  /*
   * 定义参数
   * */
  public abstract defineParam(definitions: TParamDefinition[]): void;
  /*
   * 执行解析
   * */
  public abstract exec(input: string): ParserResult;
}

export class Parser implements ParserProvider {
  /* 大小写敏感 */
  caseSensitive: boolean;
  private readonly result: ParserResult;

  protected constructor() {
    this.caseSensitive = true;

    this.result = new ParserResult();
  }

  public static STOP_WHILE_LOOP_INDICATOR = '\\s{1,}';

  public static getParser(): Parser {
    return new Parser();
  }

  defineParam(definitions: TParamDefinition[]): void {
    for (let i = 0; i < definitions.length; i++) {
      this.result.setParam(definitions[i]);
    }
  }

  exec(input: string): ParserResult {
    const tokens: Token[] = [];

    let strBuf: string;
    let start = 0;
    let end = 0;

    let prevToken: Token;

    const END_OF_WHILE_LOOP_LENGTH = input.trim().length;

    while (end <= END_OF_WHILE_LOOP_LENGTH) {
      const walkIndexStr = input.slice(end, end + 1);

      if (
        new RegExp(Parser.STOP_WHILE_LOOP_INDICATOR).test(walkIndexStr) ||
        end === END_OF_WHILE_LOOP_LENGTH
      ) {
        strBuf = input.slice(start, end);

        if (/\s/.exec(strBuf)) {
          start++;
          end++;
          continue;
        }

        const token = Parser._emitToken({ start, end }, strBuf, prevToken);
        tokens.push(token);
        prevToken = token;
        start = end + 1;
      }

      end++;
    }

    return this.result.analysisTokens(tokens);
  }

  private static _emitToken(pos: TTokenPos, buf: string, prevToken: Token): Token {
    //
    if (FlagNameRegex.ShortNameRegex.test(buf)) {
      return new Token({
        value: buf,
        pos,
        kind: TokenKind.LongFlagNameKind
      });
    }

    if (FlagNameRegex.LongNameRegex.test(buf)) {
      return new Token({
        value: buf,
        pos,
        kind: TokenKind.ShortFlagNameKind
      });
    }

    if (
      prevToken?.kind === TokenKind.LongFlagNameKind ||
      prevToken?.kind === TokenKind.ShortFlagNameKind
    ) {
      return new Token({
        value: buf,
        pos,
        kind: TokenKind.ValueKind
      });
    }

    if (pos.start === 0 && pos.end !== 0) {
      return new Token({
        value: buf,
        pos,
        kind: TokenKind.CommandKind
      });
    } else {
      return new Token({
        value: buf,
        pos,
        kind: TokenKind.SubCommandKind
      });
    }
  }
}
