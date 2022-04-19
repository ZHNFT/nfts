import { Parser } from '@nfts/argparser';
import { Command } from './Command';
import { Debug } from '../debug/Debug';
import { Measure } from '../measure/Measure';
import { CommandLineParameterManager } from './CommandLineParameter';

interface ParsedCommandLineOption {
  _: string[];
  [key: string]: string | string[];
}

export class CommandLine extends CommandLineParameterManager {
  private readonly _name: string;
  private readonly _description: string;

  private readonly _debug: Debug;
  private readonly _parser: Parser;
  private readonly _measure: Measure;

  private readonly _commands: Command[] = [];

  protected constructor({
    toolName,
    toolDescription
  }: {
    toolName: string;
    toolDescription: string;
  }) {
    const parser = new Parser();

    super({ parser });

    this._parser = parser;
    this._name = toolName;
    this._description = toolDescription;

    this._debug = Debug.getScopedLogger(toolName);
    this._measure = new Measure({ debug: this._debug });
  }

  public addCommand(command: Command) {
    this._commands.push(command);
    this._addCommandParser(command);
  }

  private _addCommandParser(command: Command): void {
    this._parser.addSubParser(command.subParser);
  }

  private _findCommand(name: string[]): Command {
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
    const { _, ...args } = this._parser.parse<ParsedCommandLineOption>(_args);
    const command = this._findCommand(_);
    await this._measure.asyncTask('CommandLine.execute', async function onExecute() {
      return command.onExecute(args);
    });
  }
}
