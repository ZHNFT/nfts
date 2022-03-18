import { OptionTypes } from '@ntfs/argparser';
import BaseCommand from './BaseCommand';

export interface TestCommandOptions {
  clean: boolean;
}

export default class TestCommand extends BaseCommand {
  constructor() {
    super({
      name: 'test',
      usage: 'test...'
    });

    this.addOption({ type: OptionTypes.Flag, name: '--clean', usage: '' });
  }
}
