import { Tokenizer } from './Tokenizer';
import { Token, TokenTypes } from './Token';

export enum AstNodeTypes {
  'Script' = 'Script',
  'Command' = 'Command',
  'Variable' = 'Variable'
}

export abstract class AstBaseNode {
  abstract kind: keyof typeof AstNodeTypes;
}

export class AstScriptNode extends AstBaseNode {
  readonly kind: AstNodeTypes.Script;
  body: AstNode;
}

export class AstCommandNode extends AstBaseNode {
  readonly kind: AstNodeTypes.Command;
  arguments: AstNode[];
}

export class AstTextNode extends AstBaseNode {
  readonly kind: AstNodeTypes.Variable;
  token: Token;
}

export type AstNode = AstScriptNode | AstCommandNode;

export class Ast {
  private _tokenizer: Tokenizer;
  private _peekedToken: Token;

  constructor(input: string) {
    this._tokenizer = new Tokenizer(input);
  }

  public parse(): AstScriptNode {
    const astScript = new AstScriptNode();

    this._peekToken();
    const astCommand = this._getCommand();

    if (!astCommand) {
      throw Error(`需要一个指令`);
    }

    astScript.body = astCommand;

    return astScript;
  }

  private _peekToken(): Token | undefined {
    if (!this._peekedToken) {
      this._peekedToken = this._tokenizer.readToken();
    }

    return this._peekedToken;
  }

  private _getCommand(): AstCommandNode | undefined {
    if (!this._peekedToken) {
      throw Error('error');
    }

    const astCommand = new AstCommandNode();

    return astCommand;
  }

  private _getCommandArguments() {}
}