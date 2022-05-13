import os from 'os';
import { chalk } from '@nfts/node-utils-library';
import { Parser } from '../parsers/Parser';
import { SubParser } from '../parsers/SubParser';
import { TParameter } from '../parameters';

export class Utils {
  public static hasParamFlagPrefix = (paramFlag: string) => {
    return /^-{1,2}([\w_]+)$/g.test(paramFlag);
  };

  public static stripParamFlagPrefix = (paramFlag: string): string => paramFlag.replace(/^-{1,2}/, '');

  /**
   *
   * @param rootParser
   * @param actionNames
   */
  public static findActiveParser = (rootParser: SubParser, actionNames: string[]): SubParser => {
    const _actionNames = actionNames.slice(0);
    let _actionName: string;
    let _next: Parser | SubParser = rootParser;
    while ((_actionName = _actionNames.shift())) {
      if (!_next) {
        Utils.printHelp(rootParser);
        throw new Error(`Command ${_actionName} is not defined`);
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
  public static applyParameterValue(parser: SubParser | Parser, paramName: string, value: unknown): TParameter {
    const _param = parser.findParameter(paramName);

    if (!_param) {
      Utils.printHelp(parser);
      throw new Error(`Parameter ${paramName} is not defined`);
    }

    _param.value = value as string | boolean | string[];

    return _param;
  }

  /**
   * 输出帮助信息，通过parameter的定义以及parser的定义来输出信息
   * @param parser
   */
  public static printHelp(parser: Parser | SubParser) {
    const parsers: SubParser[] = [];
    const root = parser._findRootParser();

    const getSubParsers = (parser: SubParser, collect: SubParser[]) => {
      const _parsers = parser.getAllParsers();

      if (_parsers.length > 0) {
        for (let i = 0; i < _parsers.length; i++) {
          const _parser = _parsers[i];
          collect.push(_parser);
          getSubParsers(_parser, collect);
        }
      } else {
        //
      }
    };

    // 获取所有的parsers
    getSubParsers(root, parsers);
    // 组合输出信息
    const outputHeader = [`${root.name} <Command> [option]`, `  ${root.description}\n`];
    const outputContent = parsers.map(_parser => Utils.singleCommandHelp(_parser));
    process.stdout.write(`${outputHeader.join(os.EOL)}\nCOMMAND\n${outputContent.join(os.EOL)}`);
  }

  public static singleCommandHelp(parser: SubParser): string {
    const parameters = parser.getAllParameters();

    /**
     * 收集parameter
     */
    let options: [string, string][] = parameters.map(_parameter => [
      `${_parameter.name}${_parameter.shortName ? `,${_parameter.shortName}` : ''}`,
      _parameter.summary ?? ''
    ]);

    // 计算 parameter name 的长度，保持 description 对齐；
    const _maxLength = Math.max(...options.map(option => option[0].length));
    // 名字与描述之间保持的最小间距；
    const minGap = 4;

    // 填充较短的名称
    options = options.map(options => {
      return [options[0].padEnd(_maxLength + minGap, ' '), options[1]];
    });

    const str = options.reduce<string>((accumulate, current) => {
      accumulate += `    ${current.join('')}${os.EOL}`;
      return accumulate;
    }, '');

    return `  ${chalk.green(parser.name)}` + `  ${parser.description}\n` + str;
  }
}
