import { importSync } from '@nfts/node-utils-library';
import type { Configuration } from 'webpack';

export class WebpackConfigLoader {
  loadFromFile(path: string): Configuration | ((args?: unknown) => Configuration) {
    const _mod = importSync(path) as Configuration;
    return _mod;
  }
  load() {
    //
  }
}
