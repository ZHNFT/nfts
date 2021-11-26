import { Command } from '@nfts/node-command';
import * as console from 'console';

export class Superior extends Command<any> {
  constructor() {
    super({
      commandName: 'gmf',
      commandDescription: 'Toolkit'
    });
  }

  prepare(): Superior {
    this._readOptionsFromConfiguration();
    /**
     * 读取命令行配置
     */
    return this;
  }

  _readOptionsFromConfiguration() {
    //
  }

  async execute(): Promise<void> {
    console.log('execute');
  }
}
