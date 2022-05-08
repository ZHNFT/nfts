import { Colors } from '@nfts/interactive-query';
import { Measure, importSync } from '@nfts/node-utils-library';
import { Plugin, PluginContext } from '../../classes/Plugin';
import { TypescriptRunner } from './TypescriptRunner';

export interface TypescriptPluginOptions {
  // 开启 WatchMode；
  watch?: boolean;
  // 输出所有构建信息；
  verbose?: boolean;
  // tsconfig.json 文件相对路径
  tsconfigPath: string;
}

const NAME = 'TypescriptPlugin';
const DESCRIPTION = '';

export interface TypescriptPluginOptions {
  NO_OPTIONS_RIGHT_NOW: unknown;
}

class TypescriptPlugin implements Plugin {
  readonly name = NAME;
  readonly summary = DESCRIPTION;

  readonly typescriptVersion: string;

  apply({ hooks, getScopedLogger, configuration }: PluginContext, _: TypescriptPluginOptions): void {
    const logger = getScopedLogger(NAME);

    hooks.build.add(NAME, build => {
      build.hooks.compile.add(NAME, compile => {
        compile.hooks.run.add(NAME, async () => {
          const tsRunner: TypescriptRunner = new TypescriptRunner({
            debug: logger
          });
          logger.log(
            `Build Start in ${compile.cmdParams.watch ? Colors.green('DEVELOPMENT') : Colors.cyan('PRODUCTION')} mode`
          );

          await Measure.taskAsync(
            `[${NAME}]`,
            async () =>
              await tsRunner._runBuild({ commandLineParameters: compile.cmdParams }, () => {
                // After emit
              }),
            function taskExecutedCallback(spendTimeMS) {
              logger.log(`Build end with time ${(spendTimeMS / 1000).toFixed(2)}s`);
            }
          );
        });
      });
    });
  }
}

export default new TypescriptPlugin();
