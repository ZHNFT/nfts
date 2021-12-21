import { Parser } from '../parser';

export type TCommandLineInitOption = {
  toolName: string;
  toolDescription: string;
};

export abstract class CommandLineBase {
  readonly toolName: string;
  readonly toolDescription: string;

  readonly commandLineParser: Parser;

  constructor({ toolName, toolDescription }: TCommandLineInitOption) {
    this.toolName = toolName;
    this.toolDescription = toolDescription;

    this.commandLineParser = new Parser();
  }

  abstract defineParameter(): void;
}

export class CommandLine extends CommandLineBase {
  constructor(opts: TCommandLineInitOption) {
    super(opts);
  }
  defineParameter(): void {
    throw new Error('Method not implemented.');
  }
}
