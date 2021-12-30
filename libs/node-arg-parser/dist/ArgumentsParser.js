import { ArgumentsParserResult } from './ArgumentsParserResult';
export var ArgumentParamKind;
(function (ArgumentParamKind) {
  ArgumentParamKind['String'] = 'String';
  ArgumentParamKind['Bool'] = 'Bool';
  ArgumentParamKind['Array'] = 'Array';
  ArgumentParamKind['Number'] = 'Number';
})(ArgumentParamKind || (ArgumentParamKind = {}));
var TokenKind;
(function (TokenKind) {
  TokenKind['CommandFlag'] = 'CommandFlag';
  TokenKind['ShortNameFlag'] = 'ShortNameFlag';
  TokenKind['LongNameFlag'] = 'LongNameFlag';
  TokenKind['ValueFlag'] = 'ValueFlag';
  // preserved
  TokenKind['EolFlag'] = 'EolFlag';
  TokenKind['SpaceFlag'] = 'SpaceFlag';
})(TokenKind || (TokenKind = {}));
export var StepType;
(function (StepType) {
  StepType['BeforeExec'] = 'BeforeExec';
  StepType['AfterExec'] = 'AfterExec';
})(StepType || (StepType = {}));
export class ArgumentsParser {
  constructor() {
    this._executed = false;
    this.result = new ArgumentsParserResult();
  }
  /**
   * 缓存定义的参数配置
   */
  defineParam(param) {
    this._processVerify(StepType.BeforeExec);
    this._definedParams.set(param.name, param);
  }
  /**
   * 获取参数值
   * @param paramName
   */
  getParamValue(paramName) {
    this._processVerify(StepType.AfterExec);
    const strParamValue = this.result.getParamValueByName(paramName);
    const paramDefine = this._definedParams.get(paramName);
    if (!paramDefine) {
      console.error(`parameter: ${paramName} is not defined`);
      return undefined;
    }
    const { kind } = paramDefine;
    return ArgumentsParser._transValueByKind(kind, strParamValue);
  }
  /**
   * 获取command
   */
  getCommand() {
    this._processVerify(StepType.AfterExec);
    return this.result.command;
  }
  /**
   * 获取子命令集合
   */
  getSubCommands() {
    this._processVerify(StepType.AfterExec);
    return Array.from(this.result.subCommands);
  }
  /**
   * 通过kind，将数据转换称需要的类型，默认是string
   * @param kind
   * @param str
   * @private
   */
  static _transValueByKind(kind, str) {
    switch (kind) {
      case ArgumentParamKind.Array:
        return str.split(',');
      case ArgumentParamKind.Bool:
        return Boolean(str);
      case ArgumentParamKind.Number:
        return Number(str);
      case ArgumentParamKind.String:
        return str;
    }
  }
  /**
   * 将参数解析成Token形式
   * @return {void}
   */
  exec(args) {
    const tokens = [];
    let strBuf;
    let start = 0;
    let end = 0;
    let prevToken;
    const STOP_WHILE_LOOP_INDICATOR = '\\s{1,}';
    const END_OF_WHILE_LOOP_LENGTH = args.trim().length;
    while (end < END_OF_WHILE_LOOP_LENGTH) {
      const walkIndexStr = args.slice(end, end + 1);
      if (new RegExp(STOP_WHILE_LOOP_INDICATOR).test(walkIndexStr)) {
        strBuf = args.slice(start, end);
        if (/\s/.exec(strBuf)) {
          start++;
          end++;
          continue;
        }
        const token = {
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
    this._executed = true;
    return this.result;
  }
  _getParamsFromTokens(tokens) {
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
          i === 0 && this.result.setCommand(_token.buffer);
          i !== 0 && this.result.addSubCommands(_token.buffer);
          break;
        case TokenKind.LongNameFlag:
        case TokenKind.ShortNameFlag:
          this.result.setParamValueByName(
            _token.buffer,
            _nextMaybeValueToken.kind === TokenKind.ValueFlag ? _nextMaybeValueToken.buffer : undefined
          );
          break;
      }
    }
  }
  _tokenKind(str, pos, prevToken) {
    if (ArgumentsParser.argLongNameRegex.test(str)) {
      return TokenKind.LongNameFlag;
    }
    if (ArgumentsParser.argShortNameRegex.test(str)) {
      return TokenKind.ShortNameFlag;
    }
    if (!this.result.command && pos.start === 0 && pos.end !== 0) {
      return TokenKind.CommandFlag;
    }
    if (prevToken.kind === TokenKind.LongNameFlag || prevToken.kind === TokenKind.ShortNameFlag) {
      return TokenKind.ValueFlag;
    }
    return null;
  }
  _processVerify(ensureStep) {
    if (
      (ensureStep === StepType.BeforeExec && this._executed) ||
      (ensureStep === StepType.AfterExec && !this._executed)
    ) {
      throw Error(`Wrong Execution Timing:`);
    }
  }
}
/**
 * 长参数名校验正则
 * @type {RegExp}
 */
ArgumentsParser.argLongNameRegex = /^\w/;
/**
 * 短参数名校验正则
 * @type {RegExp}
 */
ArgumentsParser.argShortNameRegex = /^\w/;
