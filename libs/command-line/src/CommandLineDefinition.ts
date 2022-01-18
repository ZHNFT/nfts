import { ArgumentsParser } from '@ntfs/node-arg-parser';
import { BaseParameter, IBaseParameterInitOptions } from './base/BaseParameter';
import { BaseCommand } from './base/BaseCommand';
import { ErrorKind, InternalError } from '@ntfs/node-utils-library';

export class CommandLineToolDefinition extends BaseCommand {
  private readonly _parser: ArgumentsParser;
  readonly _parameterByName: Map<string, BaseParameter>;

  public constructor({ toolName, toolDescription }: { toolName: string; toolDescription: string }) {
    super({
      commandName: toolName,
      commandDescription: toolDescription
    });

    this._parser = new ArgumentsParser();
  }

  get parser(): ArgumentsParser {
    return this._parser;
  }

  set parser(value: unknown) {
    throw new InternalError({ message: "Can't set parser directly", kind: ErrorKind.Fatal });
  }

  public defineParameters(paramDefinitions: IBaseParameterInitOptions[]): void {
    for (const definition of paramDefinitions) {
      const parameterInstance = new BaseParameter(definition);

      this._parameterByName.set(definition.longName, parameterInstance);
      this._parameterByName.set(definition.shortName, parameterInstance);

      this._parser.defineParam(definition);
    }
  }
}
