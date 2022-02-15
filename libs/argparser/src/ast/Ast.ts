import { Token, Tokenizer, TokenTypes } from './Tokenizer';

export enum AstNodeType {
  'Script' = 'Script', // 脚本
  'Command' = 'Command', // 指令
  'Text' = 'Text', // 文本
  'Variable' = 'Variable', // 变量
  'And' = 'And', // &&
  'CommandAction' = 'CommandAction' // 子命令
}

abstract class AstBaseNode {
  abstract readonly kind: keyof typeof AstNodeType;
}

class AstScriptNode extends AstBaseNode {
  readonly kind: AstNodeType.Script;
  /* 脚本主体 */
  body: AstNode;
}

export class AstCommandActionNode extends AstBaseNode {
  readonly kind = AstNodeType.CommandAction;
  actionName: AstNode;
  // 命令参数
  arguments?: AstNode[];
}

export class AstCommandNode extends AstBaseNode {
  readonly kind = AstNodeType.Command;
  /* 文本节点 */
  token: Token;
  // 命令名称
  commandName: AstNode;
  actions?: AstNode[];
}

export class AstTextNode extends AstBaseNode {
  readonly kind = AstNodeType.Text;
  /* 文本节点 */
  token: Token;
  /* 输出节点值 */
  public toString(): string {
    return this.token.toString();
  }
}

class AstVariableNode extends AstBaseNode {
  readonly kind = AstNodeType.Variable;
  /* 变量文本节点 */
  token: Token;
}

class AstAndNode extends AstBaseNode {
  readonly kind = AstNodeType.And;
}

export type AstNode =
  | AstScriptNode
  | AstCommandNode
  | AstCommandActionNode
  | AstTextNode
  | AstVariableNode
  | AstAndNode;

export class Ast {
  _tokenizer: Tokenizer;
  _token: Token;

  constructor(tokenizer: Tokenizer) {
    this._tokenizer = tokenizer;
  }

  public parse(): AstScriptNode {
    const ast = new AstScriptNode();
    const firstToken = this._getToken();

    if (firstToken.kind !== TokenTypes.Text) {
      throw Error('缺少命令名称');
    }

    const _astCommand = new AstCommandNode();

    _astCommand.commandName = this._getTextNode();
    _astCommand.actions = this._getCommandActions();

    ast.body = _astCommand;
    return ast;
  }

  private _getToken(): Token {
    if (!this._token) {
      this._token = this._tokenizer.readToken();
    }

    return this._token;
  }

  private _peekToken(): Token {
    this._token = this._tokenizer.readToken();
    return this._token;
  }

  private _getCommandAction(): AstCommandActionNode {
    if (this._token.kind !== TokenTypes.Text) {
      throw Error(`缺少子命令`);
    }

    const astCommandActionNode = new AstCommandActionNode();

    astCommandActionNode.actionName = this._getTextNode();

    this._peekToken();

    astCommandActionNode.arguments = this._getCommandArguments();

    return astCommandActionNode;
  }

  private _getCommandActions(): AstCommandActionNode[] {
    const _nodes: AstCommandActionNode[] = [];
    let _token = this._peekToken();
    while (_token.kind !== TokenTypes.EndOfSource) {
      if (_token.kind === TokenTypes.Space) {
        _token = this._peekToken();
        continue;
      }
      _nodes.push(this._getCommandAction());
      _token = this._peekToken();
    }

    return _nodes;
  }

  private _getCommandArguments(): AstNode[] {
    const _args: AstNode[] = [];
    while (
      this._token.kind !== TokenTypes.And &&
      this._token.kind !== TokenTypes.EndOfSource
    ) {
      switch (this._token.kind) {
        case TokenTypes.Text:
          _args.push(this._getTextNode());
          break;
        case TokenTypes.ShortFlag:
        case TokenTypes.LongFlag:
          _args.push(this._getTextNode());
          break;
        case TokenTypes.Space:
        case TokenTypes.Other:
          break;
        case TokenTypes.Variable:
          _args.push(this._getVariableNode());
          break;

        default:
          break;
      }

      this._peekToken();
    }

    return _args;
  }

  private _getTextNode(): AstTextNode {
    const _node = new AstTextNode();
    _node.token = this._token;

    return _node;
  }

  private _getVariableNode(): AstVariableNode {
    const _node = new AstVariableNode();
    _node.token = this._token;

    return _node;
  }
}
