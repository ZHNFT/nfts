import { Plugin, PluginContext } from '../core/Plugin';

export default class CopyPlugin extends Plugin {
  name: 'copy';
  summary: 'Copy static files';

  apply = (ctx: PluginContext): void => {
    console.log('Copy folder & files!');
  };
}
