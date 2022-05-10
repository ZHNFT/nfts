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
  public createCompilerAndRun(config: Configuration, opts: WebpackRunOptions): void {
    this.config = config;
    this.compiler = Webpack(
      {
        ...config,
        watch: opts.watch,
        watchOptions: {}
      },
      (error, stats) => {
        this.onCompilerCreationCallback(error, stats, opts);
      }
    );
  }

  private _formatWebpackMessage(stats: Webpack.Stats) {
    const { errors, warnings, errorsCount, warningsCount } = stats.toJson();

    const errorsFormattedMessage = errors.map(err => {
      const { file, details } = err;
      return `${file} \n${details}`;
    });

    const warningsFormattedMessage = warnings.map(warn => {
      const { file, details } = warn;
      return `${file} \n${details}`;
    });

    console.log([...errorsFormattedMessage, ...warningsFormattedMessage].join('/n'));
    console.log(`Compiled with ${errorsCount} errors and ${warningsCount} warnings`);
  }

  private _runBuild(options: WebpackRunOptions, compiler?: Compiler): void {
    let innerCompiler = this.compiler;
    if (compiler) {
      innerCompiler = compiler;
    }

    if (options.watch && this.config.devServer) {
      const devServerOption = this.config.devServer;

      const watchServer = new WebpackDevServerRunner().run({ ...devServerOption }, innerCompiler);

      watchServer.startCallback(err => {
        if (err) {
          watchServer.close();
        }
        const localUrl = `${devServerOption.https ? 'https' : 'http'}://${devServerOption.host || 'localhost'}:${
          devServerOption.port || '8080'
        }`;
        console.log(`Successfully started server on ${localUrl}`);
      });
    } else {
      innerCompiler.run((error, stats) => {
        if (error) {
          throw error;
        }
        if (!stats.hasErrors() && !stats.hasWarnings()) {
          console.log(`Compile successfully with no errors!`);
          return;
        }

        this._formatWebpackMessage(stats);
      });
    }
  }

  private onCompilerCreationCallback = (error: Webpack.StatsError, stats: Webpack.Stats, opts: WebpackRunOptions) => {
    if (error) {
      throw error;
    }

    // Todo  Where watch node happen, add format for watch mode message
    this._formatWebpackMessage(stats);
    if (!opts.watch) {
      this._runBuild({ watch: opts?.watch });
    }
  };
}
