import {
  Ast,
  AstCommandActionNode,
  AstCommandNode,
  AstNode,
  AstTextNode
} from './ast/Ast';
import { Tokenizer } from './ast/Tokenizer';
import * as process from 'process';

export enum OptionTypes {
  String = 'String',
  Number = 'Number'
}

export class Option {
  name: string;
  description: string;
  type?: keyof typeof OptionTypes;
  required?: boolean;

  constructor({
    name,
    description,
    required,
    type
  }: {
    name: string;
    description: string;
    type?: keyof typeof OptionTypes;
    required?: boolean;
  }) {
    this.name = name;
    this.description = description;
    this.required = required;
    this.type = type;
  }
}

export class ParseResult {
  private readonly options: Map<string, string | number>;

  public setOptionStrict(option: string, value: string | number): void {
    if (this.getOption(option)) {
      throw Error('重复设置option值');
    } else {
      this.setOption(option, value);
    }
  }

  public setOption(option: string, value: string | number): void {
    this.options.set(option, value);
  }

  public getOption(option: string): string | number {
    return this.options.get(option);
  }

  public getOptions(): Record<string, string | number> {
    const keys = Array.from(this.options.keys());
    return keys.reduce((r, a) => {
      r[a] = this.options.get(a);
      return r;
    }, {});
  }
}

export class Parser {
  private readonly _ast: Ast;
  private readonly _tokenizer: Tokenizer;
  private readonly _optionsByName: Record<string, Option>;

  private readonly _optionsByActionName: Record<string, ParseResult>;

  constructor() {
    this._tokenizer = new Tokenizer(process.argv.slice(0, 2).join(' '));
    this._ast = new Ast(this._tokenizer);
  }

  /** @remark 解析参数 */
  public parse(): void {
    const _astScript = this._ast.parse();
    const _command = _astScript.body;

    for (const _action of (_command as AstCommandNode).actions) {
      const { actionName, arguments: args } = _action as AstCommandActionNode;

      this._optionsByActionName[actionName.toString()] = this._getActionOptions(
        actionName,
        args
      );
    }
  }

  /**
   * 添加参数
   * @param name
   * @param description
   * @param required
   * @param type
   */
  public addOption({
    name,
    description,
    required,
    type,
    action
  }: {
    name: string;
    description: string;
    type?: keyof typeof OptionTypes;
    required?: boolean;
    action: string;
  }): void {
    this._optionsByName[name] = new Option({ name, description, required, type });
  }

  public options(commandName: string): Record<string, any> {
    return {};
  }

  private _getActionOptions(action: AstNode, args: AstNode[]): ParseResult {
    const res = new ParseResult();
  }
}
