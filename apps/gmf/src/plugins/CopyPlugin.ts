import { Plugin, PluginContext } from '../core/PluginManager';

export default class CopyPlugin extends Plugin<PluginContext> {
  name: 'copy';
  summary: 'Copy static files';

  apply = (ctx: PluginContext): void => {
    console.log('Copy folder & files!');
  };
}

