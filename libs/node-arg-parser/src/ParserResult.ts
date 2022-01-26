import type { TParamDefinition } from './Parser';
import Token from './ast/Token';
import { TokenKind } from './Constants';
import * as console from 'console';

interface TParamDefinitionWithValue extends TParamDefinition {
  value?: string;
}

export class ParserResult {
  command: string;
  subCommands: string[] = [];

  private _paramByName: Map<string, TParamDefinitionWithValue>;

  public constructor() {
    this._paramByName = new Map();
  }

  public setParam(definition: TParamDefinition): void {
    this._paramByName.set(definition.flagName, definition);
  }

  /* 获取值 */
  public getParamValueByName(name: string): string | undefined {
    return this._paramByName.get(name)?.value;
  }

  /* 获取不到值会抛出异常 */
  public strictGetParamValueByName(name: string): string | never {
    const value = this.getParamValueByName(name);
    if (!value) {
      throw new Error(`获取不到参数"${name}"的值。`);
    }

    return value;
  }

  /* 设置值 */
  public setParserParamValueByName(name: string, value: string): void {
    const param = this._paramByName.get(name);
    if (!param) {
      this._paramByName.set(name, {
        flagName: name,
        value,
        desc: name + ': 默认的参数描述'
      });
    }

    this._paramByName.set(name, {
      ...param,
      value
    });
  }

  /* 严格设置值，会抛出异常 */
  public strictSetParserParamValueByName(name: string, value: string): void {
    const param = this._paramByName.get(name);
    if (!param) {
      throw new Error(
        '设置参数值错误' + `参数"${name}"的值无法设置，因为没有通过Parser.defineParam定义`
      );
    }

    this.setParserParamValueByName(name, value);
  }

  public analysisTokens(tokens: Token[]): ParserResult {
    //
    const _tokens = tokens.slice(0);

    let t: Token | undefined;
    let i = 0;

    // 遍历token
    while (_tokens[0]) {
      t = _tokens[0];

      switch (t.kind) {
        case TokenKind.CommandKind:
          this.command = t.buffer;
          break;

        case TokenKind.SubCommandKind:
          this.subCommands.push(t.buffer);
          break;

        case TokenKind.LongFlagNameKind:
        case TokenKind.ShortFlagNameKind:
          tokens[i + 1] &&
            tokens[i + 1].kind === TokenKind.ValueKind &&
            this.strictSetParserParamValueByName(t.buffer, tokens[i + 1].buffer);
          break;
      }

      i++;
      _tokens.splice(0, 1);
    }

    return this;
  }

  /**
   * 打印参数配置
   */
  public printParams(): void {
    console.log(`---- command ${this.command} ----`);
    console.log(`options`);
    for (const value of this._paramByName.values()) {
      console.log(`  ${(value as TParamDefinition).flagName}  ${(value as TParamDefinition).desc}`);
    }
  }
}
