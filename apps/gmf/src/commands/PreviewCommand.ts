import { OptionTypes } from '@ntfs/argparser';
import BaseCommand from './BaseCommand';

export interface PreviewCommandOptions {
  clean: boolean;
}

export default class PreviewCommand extends BaseCommand {
  constructor() {
    super({
      name: 'preview',
      usage: 'preview...'
    });

    this.addOption({ type: OptionTypes.Flag, name: '--clean', usage: '' });
  }
}
