import { ICommand } from 'src';

export interface ICommandTool {
  toolName: string;
  toolDescription: string;

  addCommand(cname, command: ICommand<unknown>): Map<string, ICommand<unknown>>;
  getCommand(cname: string): ICommand<unknown>;
}

export class CommandTool implements ICommandTool {
  toolName: string;
  toolDescription: string;

  commands: Map<string, ICommand<unknown>>;

  constructor() {
    this.commands = new Map();
  }

  addCommand = (
    cname: string,
    command: ICommand<unknown>
  ): Map<string, ICommand<unknown>> => {
    return this.commands.set(cname, command);
  };

  getCommand = (name: string): ICommand<unknown> => {
    return this.commands.get(name);
  };
}
