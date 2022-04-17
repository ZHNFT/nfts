import { Parser } from '../parsers/Parser';
import { SubParser } from '../parsers/SubParser';
import { TParameter } from '../parameters';

export class Utils {
  public static hasParamFlagPrefix = (paramFlag: string) => {
    return /^-{1,2}([\w_]+)$/g.test(paramFlag);
  };

  public static stripParamFlagPrefix = (paramFlag: string): string =>
    paramFlag.replace(/^-{1,2}/, '');

  /**
   *
   * @param rootParser
   * @param actionNames
   */
  public static findActiveParser = (
    rootParser: SubParser,
    actionNames: string[]
  ): SubParser => {
    const _actionNames = actionNames.slice(0);
    let _actionName: string;
    let _next: Parser | SubParser = rootParser;
    while ((_actionName = _actionNames.shift())) {
      if (!_next) {
        throw new Error(`Action ${_actionName}`);
      }
      _next = _next.findSubParser(_actionName);
    }

    return _next;
  };

  /**
   *
   * @param parser     target parser
   * @param paramName  target parameter
   * @param value      value
   */
  public static applyParameterValue(
    parser: SubParser | Parser,
    paramName: string,
    value: unknown
  ): TParameter {
    const _param = parser.findParameter(paramName);

    if (!_param) {
      throw new Error(`Parameter ${paramName} is not defined`);
    }

    _param.value = value as string | boolean | string[];

    return _param;
  }
}
