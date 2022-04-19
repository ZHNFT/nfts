import { Plugin, PluginContext } from '@nfts/gmf';
import { SwcRunner } from './SwcRunner';

class SwcDevPlugin implements Plugin {
  name: 'SWC development plugin';
  summary: string;

  private _runner = new SwcRunner();

  async apply(ctx: PluginContext) {
    await this._runner.runAsync();
  }
}

export default new SwcDevPlugin();
