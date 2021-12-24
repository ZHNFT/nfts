import { BaseCommand } from '../../../../libs/command-line/src/base/BaseCommand';
export class ActionManager {
  _activeCommand: Map<string, BaseCommand>;

  constructor() {}

  defineCommand(command: BaseCommand) {
    this._activeCommand.set(command.commandName, command);
  }
}
