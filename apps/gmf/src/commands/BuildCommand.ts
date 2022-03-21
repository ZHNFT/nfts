import { OptionTypes } from '@ntfs/argparser';
import BaseCommand from './BaseCommand';
import { CleanPlugin } from '../plugins';
import Config from '../core/Config';

export interface BuildCommandOptions {
  clean: boolean;
}

export default class BuildCommand extends BaseCommand {
  constructor({ config }: { config: Config }) {
    super({
      name: 'build',
      usage: 'build...',
      config
    });

    this.addOption({
      type: OptionTypes.Flag,
      name: '--clean',
      usage: '',
      callback: () => {
        this.addPlugin(new CleanPlugin());
      }
    });
  }
}
