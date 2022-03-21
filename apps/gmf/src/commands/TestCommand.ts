import { OptionTypes } from '@ntfs/argparser';
import BaseCommand from './BaseCommand';
import Config from '../core/Config';

export interface TestCommandOptions {
  clean: boolean;
}

export default class TestCommand extends BaseCommand {
  constructor({ config }: { config: Config }) {
    super({
      name: 'test',
      usage: 'test...',
      config
    });

    this.addOption({ type: OptionTypes.Flag, name: '--clean', usage: '' });
  }
}
