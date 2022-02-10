import { Parser } from '@ntfs/node-arg-parser';
import { ScopedError } from '@ntfs/node-utils-library';
import { BaseParameter, TParameterDefinition } from './base/BaseParameter';
import { BaseCommand } from './base/BaseCommand';

export class CommandLineToolDefinition extends BaseCommand {
  readonly _parser: Parser = Parser.getParser();
  readonly _parameterByName: Map<string, BaseParameter>;

  public static error: ScopedError = new ScopedError('CommandLineToolDefinition');

  public constructor({
    toolName,
    toolDescription
  }: {
    toolName: string;
    toolDescription: string;
  }) {
    super({
      commandName: toolName,
      commandDescription: toolDescription
    });
  }

  set parser(value: unknown) {
    throw CommandLineToolDefinition.error.fatal("Can't set parser directly");
  }

  public defineParameters(paramDefinitions: TParameterDefinition[]): void {
    this._parser.defineParam(
      paramDefinitions.map(define => {
        return {
          flagName: define.shortName,
          required: define.required,
          desc: define.summary
        };
      })
    );
  }
}
