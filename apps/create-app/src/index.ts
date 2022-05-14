import { CommandLine, Command } from '@nfts/noddy';
import { FlagParameter, ArrayParameter, ValueOfParameters } from '@nfts/argparser';
import { Generator } from './Generator';
import * as process from 'process';

/*
 * 模板目标平台
 * */
export enum Platforms {
  react = 'react',
  node = 'node'
}

/*
 * create 指令的参数
 * */
export type TCreationCommandLineParameters = {
  ts: FlagParameter;
  platform: ArrayParameter;
};

export type ICreationParameters = ValueOfParameters<TCreationCommandLineParameters>;

class createCommand extends Command implements TCreationCommandLineParameters {
  ts: FlagParameter;
  platform: ArrayParameter;

  constructor() {
    super({
      commandName: 'create',
      commandDescription: 'Generating web/nodejs startup template'
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async onExecute(): Promise<void> {
    const parameters: ValueOfParameters<{ ts: FlagParameter; platform: ArrayParameter }> = {
      ts: this.ts.value,
      platform: this.platform.value
    };
    await Generator.run(parameters, process.cwd());
  }

  onDefineParameters(): void {
    this.ts = this.flagParameter({
      name: '--ts',
      summary: 'Using typescript boostrap your project'
    });

    this.platform = this.arrayParameter({
      name: '--platform',
      summary: 'Generate template for specific platform',
      alternatives: Object.keys(Platforms)
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
