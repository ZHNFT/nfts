import type { Configuration, Compiler } from 'webpack';
import Webpack from 'webpack';
import { WebpackDevServerRunner } from './WebpackDevServerRunner';

export interface WebpackRunOptions {
  watch?: boolean;
}

export class WebpackRunner {
  compiler: Compiler;
  config: Configuration;

  /*
   * 创建webpack compiler 实例
   * */
  public createCompiler(config: Configuration): WebpackRunner {
    this.config = config;
    this.compiler = Webpack(config, this.onCompilerCallback);
    return this;
  }

  public run(options: WebpackRunOptions, compiler?: Compiler): void {
    let innerCompiler = this.compiler;
    if (compiler) {
      innerCompiler = compiler;
    }

    if (options.watch) {
      const devServerOption = this.config.devServer ?? {};

      const watchServer = new WebpackDevServerRunner().run(
        {
          ...devServerOption
        },
        innerCompiler
      );

      watchServer.startCallback(err => {
        if (err) {
          watchServer.close();
        }
        const localUrl = `${devServerOption.https ? 'https' : 'http'}://${devServerOption.host || 'localhost'}:${
          devServerOption.port || '8080'
        }`;
        console.log(`Successfully started server on ${localUrl}`);
      });
    }

    innerCompiler.run(() => {
      //
    });
  }

  private onCompilerCallback = (errors: Webpack.StatsError, stats: Webpack.Stats) => {
    if (!stats.hasErrors() && !stats.hasWarnings()) {
      console.log(`Compile with no errors!`);
    }

    console.log(errors);
  };
}
