import { OptionTypes } from '@ntfs/argparser';
import BaseCommand from './BaseCommand';
import Config from '../core/Config';

export interface PreviewCommandOptions {
  clean: boolean;
}

export default class PreviewCommand extends BaseCommand {
  constructor({ config }: { config: Config }) {
    super({
      name: 'preview',
      usage: 'preview...',
      config
    });

    this.addOption({ type: OptionTypes.Flag, name: '--clean', usage: '' });
  }
}
