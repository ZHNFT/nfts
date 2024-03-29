import { Parser } from "@nfts/argparser";
import { Command } from "./Command";
// import { Debug } from "../debug/Debug";
import { CommandLineParameterManager } from "./CommandLineParameter";

export interface ParsedCommandLineOption {
  _: string[];
  [key: string]: string | string[];
}

export interface CommandLine {
  // onExecute?: (args?: unknown) => Promise<void>;
  onExecute?(args?: unknown, actions?: string[]): Promise<void>;
}

export abstract class CommandLine extends CommandLineParameterManager {
  // private readonly _debug: Debug;
  private readonly _parser: Parser;

  private readonly _commands: Command[] = [];

  protected constructor({
    toolName,
    toolDescription,
  }: {
    toolName: string;
    toolDescription: string;
  }) {
    const parser = new Parser({
      name: toolName,
      description: toolDescription,
    });

    super({ parser });

    this._parser = parser;
    // this._debug = Debug.getScopedLogger(toolName);
  }

  public addCommand(command: Command) {
    this._commands.push(command);
    this._addCommandParser(command);
  }

  private _addCommandParser(command: Command): void {
    this._parser.addSubParser(command.subParser);
  }

  private _findCommand(name: string[]): Command | undefined {
    if (name.length > 1) {
      throw new Error(`Multi level sub-command is not support currently`);
    }

    const commandName = name[0];

    for (let i = 0; i < this._commands.length; i++) {
      const command = this._commands[i];
      if (command.name === commandName) {
        return command;
      }
    }
  }

  public async execute(_args?: string[]) {
    const { _, ...args } = this._parser.parse(_args) as ParsedCommandLineOption;
    const command = this._findCommand(_);

    if (command) {
      await command.onExecute(args, _);
    } else {
      await this.onExecute?.(args, _);
    }
  }

  public parseCommandLine(): ParsedCommandLineOption {
    const result = this._parser.parse() as ParsedCommandLineOption;
    return Object.freeze(result);
  }
}
