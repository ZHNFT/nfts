import { ImportModule } from '@nfts/node-utils-library';
import type { Configuration } from 'webpack';

export class WebpackConfigLoader {
  loadFromFile(path: string) {
    const _mod = ImportModule.import(path) as Configuration;
  }
  load() {
    //
  }
}
