import { OptionTypes } from '@ntfs/argparser';
import BaseCommand from './BaseCommand';
import PluginManager, { PluginContext } from '../core/PluginManager';
import { CleanPlugin } from '../plugins';

export interface BuildCommandOptions {
  clean: boolean;
}

export default class BuildCommand extends BaseCommand {
  constructor({ pluginManager }: { pluginManager: PluginManager<PluginContext> }) {
    super({
      name: 'build',
      usage: 'build...'
    });

    this.addOption({
      type: OptionTypes.Flag,
      name: '--clean',
      usage: '',
      callback: () => {
        pluginManager.addPlugin(new CleanPlugin());
      }
    });
  }
}
