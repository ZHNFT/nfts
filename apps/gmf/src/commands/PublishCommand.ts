import { OptionTypes } from '@ntfs/argparser';
import BaseCommand from './BaseCommand';
import Config from '../core/Config';

export interface PublishCommandOptions {
  clean: boolean;
}

export default class PublishCommand extends BaseCommand {
  constructor({ config }: { config: Config }) {
    super({
      name: 'publish',
      usage: 'publish...',
      config
    });

    this.addOption({ type: OptionTypes.Flag, name: '--clean', usage: '' });
  }
}
