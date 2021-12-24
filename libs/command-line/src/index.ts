import { BaseCommand } from './base/BaseCommand';
import { ParameterKinds } from './parameters';
import { Parser } from './parser';

export abstract class CommandLineToolDefinition {
  toolName: string;
  toolDescription: string;

  protected _parser: Parser;

  constructor({
    toolName,
    toolDescription
  }: {
    toolName: string;
    toolDescription: string;
  }) {
    this.toolName = toolName;
    this.toolDescription = toolDescription;

    this._parser = new Parser();
    // Common Parameter Setup
    this._parser.registerParameter({
      name: '--clean',
      required: false,
      shortName: '-c',
      kind: ParameterKinds.boolean
    });

    this._parser.registerParameter({
      name: '--verbose',
      required: false,
      kind: ParameterKinds.boolean
    });
  }
}

export * from './parameters';
export * from './parser';
