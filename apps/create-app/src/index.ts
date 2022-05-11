import { CommandLine, Command } from '@nfts/noddy';
import { FlagParameter, StringParameter } from '@nfts/argparser';
import { Generator } from './Generator';

export interface ICreationParameter {
  ts: FlagParameter;
  platform: StringParameter;
}

export interface ICreationParameterValue {
  ts?: boolean;
  platform?: string;
}

class createCommand extends Command implements ICreationParameter {
  ts: FlagParameter;
  platform: StringParameter;

  constructor() {
    super({
      commandName: 'create',
      commandDescription: 'Generating web/nodejs startup template'
    });
  }

  async onExecute(): Promise<void> {
    const parameters: ICreationParameterValue = {
      ts: this.ts.value,
      platform: this.platform.name
    };
    await Generator.run(parameters);
  }

  onDefineParameters(): void {
    this.ts = this.flagParameter({
      name: '--ts',
      summary: 'Generate typescript project'
    });

    this.platform = this.stringParameter({
      name: '--platform',
      summary: 'Generate typescript project'
    });
  }
}

export default class Creation extends CommandLine {
  constructor() {
    super({
      toolName: 'create-app',
      toolDescription: 'Web project templates'
    });

    this.addCommand(new createCommand());
  }
}
