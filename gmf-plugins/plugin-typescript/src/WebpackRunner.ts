import Webpack from 'webpack';
import type { Configuration, Compiler } from 'webpack';
import { WebpackDevServerRunner } from './WebpackDevServerRunner';

export interface WebpackRunOptions {
  watch?: boolean;
}

export class WebpackRunner {
  compiler!: Compiler;
  config!: Configuration;

  /*
   * 创建webpack compiler 实例
   * */
  public createCompilerAndRun(config: Configuration, opts: WebpackRunOptions): void {
    this.config = config;
    this.compiler = Webpack(config);

    if (opts.watch) {
      const devServerConfig = this.config.devServer;
      const watchServer = new WebpackDevServerRunner().run({ ...devServerConfig }, this.compiler);
      watchServer.startCallback(err => {
        if (err) {
          watchServer.close();
        }
        const localUrl = `${devServerConfig?.https ? 'https' : 'http'}://${devServerConfig?.host || 'localhost'}:${
          devServerConfig?.port || '8080'
        }`;
        console.log(`Successfully started server on ${localUrl}`);
      });
      return;
    }

    this.compiler.run((err, stats) => {
      if (err) {
        throw err;
      }

      if (stats) {
        if (!stats.hasErrors() && !stats.hasWarnings()) {
          return;
        }

        this._formatWebpackMessage(stats);
      }
    });
  }

  private _formatWebpackMessage(stats: Webpack.Stats) {
    const { errors, warnings, errorsCount, warningsCount } = stats.toJson();

    if (errorsCount === 0 && warningsCount === 0) {
      return;
    }

    if (!warningsCount || warningsCount > 0) {
      const warningsFormattedMessage = warnings?.map(warn => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { file, details, message } = warn;
        return `${file || ''} \n${(details as string) || ''}\n ${message || ''}`;
      });
      warningsFormattedMessage && console.log(warningsFormattedMessage.join('\n'));
    }

    if (!errorsCount || errorsCount > 0) {
      const errorsFormattedMessage = errors?.map(err => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { file, details, message } = err;
        return `${file || ''} \n${(details as string) || ''}\n ${message || ''}`;
      });

      errorsFormattedMessage && console.log(errorsFormattedMessage.join('\n'));
    }
  }
}
