import { Colors } from '@nfts/interactive-query';
import { Measure } from '@nfts/noddy';
import { TypescriptRunner } from './TypescriptRunner';
import { Plugin, PluginSession } from '../../classes/Plugin';

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

  apply({ hooks, getScopedLogger, configuration }: PluginSession, _: TypescriptPluginOptions): void {
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
            async () =>
              await tsRunner._runBuild({ commandLineParameters: compile.cmdParams }, () => {
                // After emit
              }),
            function taskExecutedCallback(spendTimeMS) {
              logger.log(`Build end with time ${Measure.msFormat(spendTimeMS)}`);
            }
          );
        });
      });
    });
  }
}

export default new TypescriptPlugin();
