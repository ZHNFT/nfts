import { runCLI } from '@jest/core';
import { Plugin, PluginSession } from '../../classes/Plugin';

const NAME = 'JestPlugin';
const DESCRIPTION = 'Jest Runner Plugin For gmf';

export interface IJestPluginOpts {
  fake?: boolean;
}

/*
 * 提供执行 jest 测试用例的插件
 * */
class JestPlugin implements Plugin {
  readonly name = NAME;
  readonly summary = DESCRIPTION;

  apply(ctx: PluginSession): void | Promise<void> {
    ctx.hooks.build.add(NAME, build => {
      build.hooks.compile.add(NAME, compile => {
        compile.hooks.run.add(NAME, async () => {
          if (build.cmdParams.test) {
            await runCLI(
              {
                testRegex: ['.*/(__tests?__|tests?)/.+.(test|spec).[jt]sx?'],
                _: [],
                $0: ''
              },
              [process.cwd()]
            );
          }
        });
      });
    });
  }
}

export default new JestPlugin();
