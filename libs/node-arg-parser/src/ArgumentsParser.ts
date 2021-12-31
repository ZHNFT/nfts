import { ArgumentsParserResult } from './ArgumentsParserResult';
import { ArgumentsParserError } from './ArgumentsParserError';

export type TGoodParameterValueTypes = string | string[] | boolean | number;

export enum ArgumentParamKinds {
  String = 'String',
  Bool = 'Bool',
  Array = 'Array',
  Number = 'Number'
  // StringArray = 'StringArray',
  // NumberArray = 'NumberArray'
}

export type TArgumentParamKind = keyof typeof ArgumentParamKinds;

enum TokenKind {
  CommandFlag = 'CommandFlag',
  SubCommandFlag = 'SubCommandFlag',
  ShortNameFlag = 'ShortNameFlag',
  LongNameFlag = 'LongNameFlag',
  ValueFlag = 'ValueFlag',

  // preserved
  EolFlag = 'EolFlag',
  SpaceFlag = 'SpaceFlag'
}

type TTokenKind = keyof typeof TokenKind;

type Token = {
  pos: {
    start: number;
    end: number;
  };
  buffer: string;
  kind: TTokenKind;
};

export interface IArgumentParamDefinition {
  longName: string;
  shortName?: string;
  summary?: string;
  required?: boolean;
  kind?: TArgumentParamKind;
}

export enum StepType {
  BeforeExec = 'BeforeExec',
  AfterExec = 'AfterExec'
}

export class ArgumentsParser {
  /**
   * 长参数名校验正则
   * @type {RegExp}
   */
  static argLongNameRegex: RegExp = /^--\w/;
  /**
   * 短参数名校验正则
   * @type {RegExp}
   */
  static argShortNameRegex: RegExp = /^-\w/;
  /**
   * 缓存defineParam设置的参数配置；
   * @type {Map<string, IArgumentParamDefinition>}
   */
  private _definedParams: Map<string, IArgumentParamDefinition>;

  /**
   * 解析错误
   * @type {ArgumentsParserError[]}
   */
  // _errors: ArgumentsParserError[];
  /**
   * 解析结果
   * @type {ArgumentsParserResult}
   */
  public result: ArgumentsParserResult;

  public constructor() {
    this.result = new ArgumentsParserResult();
    this._definedParams = new Map<string, IArgumentParamDefinition>();
  }

  /**
   * 缓存定义的参数配置
   */
  public defineParam(param: IArgumentParamDefinition): void {
    this._definedParams.set(param.longName, param);
    param.shortName && this._definedParams.set(param.shortName, param);
  }

  /**
   * 获取参数值
   * @param paramName
   */
  public getParamValue(paramName: string): TGoodParameterValueTypes {
    const strParamValue = this.result.getValueByParamName(paramName);

    const paramDefine = this._definedParams.get(paramName);

    if (!paramDefine) {
      console.error(`parameter: ${paramName} is not defined`);
      return undefined;
    }

    const { kind } = paramDefine;

    return ArgumentsParser._transValueByKind(kind, strParamValue);
  }

  public printParamMessage() {
    //
  }

  /**
   * 通过kind，将数据转换称需要的类型，默认是string
   * @param kind
   * @param str
   * @private
   */
  private static _transValueByKind(
    kind: TArgumentParamKind,
    str: string | undefined
  ): TGoodParameterValueTypes {
    switch (kind) {
      case ArgumentParamKinds.Array:
        return str.split(',');
      case ArgumentParamKinds.Bool:
        return Boolean(str);
      case ArgumentParamKinds.Number:
        return Number(str);
      case ArgumentParamKinds.String:
        return str;
    }
  }

  /**
   * 将参数解析成Token形式
   * @return {void}
   */
  exec(args: string): ArgumentsParserResult {
    const tokens: Token[] = [];

    let strBuf: string;
    let start = 0;
    let end = 0;

    let prevToken: Token;

    const STOP_WHILE_LOOP_INDICATOR = '\\s{1,}';
    const END_OF_WHILE_LOOP_LENGTH = args.trim().length;

    while (end <= END_OF_WHILE_LOOP_LENGTH) {
      const walkIndexStr = args.slice(end, end + 1);

      if (
        new RegExp(STOP_WHILE_LOOP_INDICATOR).test(walkIndexStr) ||
        end === END_OF_WHILE_LOOP_LENGTH
      ) {
        strBuf = args.slice(start, end);

        if (/\s/.exec(strBuf)) {
          start++;
          end++;
          continue;
        }

        const token: Token = {
          pos: { start, end },
          buffer: strBuf,
          kind: this._tokenKind(strBuf, { start, end }, prevToken)
        };

        tokens.push(token);
        prevToken = token;
        start = end + 1;
      }
      end++;
    }

    this._getParamsFromTokens(tokens);

    return this.result;
  }

  private _getParamsFromTokens(tokens: Token[]) {
    for (let i = 0; i < tokens.length; i++) {
      const _token = tokens[i];

      /**
       * 假设NameFlag Token的下一个Token时ValueFlag Token；
       * 如果是的话，直接设置为当前NameFlag的值写入result；
       * 如果不是，那就是一个独立的Flag，默认为undefined，设置选项可以将其设置成true；
       */
      const _nextMaybeValueToken = tokens[i + 1];

      switch (_token.kind) {
        case TokenKind.CommandFlag:
          this.result.setCommand(_token.buffer);
          break;
        case TokenKind.SubCommandFlag:
          this.result.addSubCommand(_token.buffer);
          break;
        case TokenKind.LongNameFlag:
        case TokenKind.ShortNameFlag:
          this.result.setValueByParamName(
            _token.buffer,
            // @todo 默认填充undefined，需要配置这个字段
            _nextMaybeValueToken?.kind === TokenKind.ValueFlag
              ? _nextMaybeValueToken.buffer
              : undefined
          );
          break;
      }
    }

    this._checkParamValueAccordingToParamDefinition();
  }

  private _tokenKind(
    str: string,
    pos: Token['pos'],
    prevToken: Token | undefined
  ): TTokenKind {
    if (ArgumentsParser.argLongNameRegex.test(str)) {
      return TokenKind.LongNameFlag;
    }

    if (ArgumentsParser.argShortNameRegex.test(str)) {
      return TokenKind.ShortNameFlag;
    }

    if (
      prevToken?.kind === TokenKind.LongNameFlag ||
      prevToken?.kind === TokenKind.ShortNameFlag
    ) {
      return TokenKind.ValueFlag;
    }

    if (!this.result.command && pos.start === 0 && pos.end !== 0) {
      return TokenKind.CommandFlag;
    } else {
      return TokenKind.SubCommandFlag;
    }
  }

  private _checkParamValueAccordingToParamDefinition() {
    const paramDefinitions = this._definedParams.values();

    for (const paramDefinition of paramDefinitions as unknown as Array<IArgumentParamDefinition>) {
      const { longName, shortName, required } = paramDefinition;
      if (
        required &&
        !this.result.getValueByParamName(longName) &&
        !this.result.getValueByParamName(shortName)
      ) {
        throw new ArgumentsParserError(
          `Argument ${longName}/${shortName} is required, but not find in the parse result.`
        );
      }

      if (this.result.hasParam(longName) && this.result.hasParam(shortName)) {
        console.warn(
          `Both long name(${longName}) and short name(${shortName}) exist, will ignore short name`
        );
      }
    }
  }
}
