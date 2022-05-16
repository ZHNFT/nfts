import type { Configuration } from 'webpack-dev-server';
import type { Compiler } from 'webpack';

import WebpackDevServer from 'webpack-dev-server';

export class WebpackDevServerRunner {
  run(devConfig: Configuration, compiler: Compiler): WebpackDevServer {
    return new WebpackDevServer(devConfig, compiler);
  }
}
