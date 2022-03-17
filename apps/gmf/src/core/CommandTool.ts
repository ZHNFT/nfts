import { Parser } from '@ntfs/argparser';
import BaseCommand from '../commands/BaseCommand';

type TOptionCallback = (arg?: any) => void;

export default class CommandTool {
  private readonly _parser: Parser;
  private _optionCallbacks: Map<string, TOptionCallback>;

  constructor({
    toolName,
    toolDescription
  }: {
    toolName: string;
    toolDescription: string;
  }) {
    this._parser = new Parser({
      name: toolName,
      description: toolDescription
    });
    this._optionCallbacks = new Map<string, TOptionCallback>();
  }

  addCommand(command: BaseCommand) {
    //
  }
}
