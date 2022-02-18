import { Command } from '@ntfs/argparser';

export type TOption = {
  name: string;
  description: string;
};

export type TAction = {
  name: string;
  description: string;
  options: TOption[];
};

export class CommandLine extends Command {
  constructor({
    toolName,
    toolVersion,
    toolDescription
  }: {
    toolName: string;
    toolVersion: string;
    toolDescription: string;
  }) {
    super(toolName, toolDescription, toolVersion);
  }

  get version(): string {
    // @ts-ignore
    return super._version;
  }

  public onDefineAction(action: TAction) {
    const { name, description, options } = action;
    const _action = this.addActionByConfig({ name, description });

    for (let i = 0; i < options.length; i++) {
      _action.addOption(options[i]);
    }

    _action.bindTo(this);

    return this;
  }
}
