import { OptionTypes } from '@ntfs/argparser';
import BaseCommand from './BaseCommand';

export interface PublishCommandOptions {
  clean: boolean;
}

export default class PublishCommand extends BaseCommand {
  constructor() {
    super({
      name: 'publish',
      usage: 'publish...'
    });

    this.addOption({ type: OptionTypes.Flag, name: '--clean', usage: '' });
  }
}
