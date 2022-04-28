import { runCLI } from '@jest/core';
import { Plugin, PluginContext } from '../../classes/Plugin';

const PluginName = 'JestPlugin';
const PluginDescription = 'Jest Runner Plugin For Gmf';

export interface IJestPluginOpts {
  fake?: boolean;
}

class JestPlugin implements Plugin {
  readonly name = PluginName;
  readonly summary = PluginDescription;

  apply(ctx: PluginContext): void | Promise<void> {
    ctx.hooks.build.compile.add(PluginName, compile => {
      compile.hooks.afterCompile.add(PluginName, async () => {
        await runCLI(
          {
            preset: 'ts-jest',
            testEnvironment: 'node',
            testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
            _: process.argv,
            $0: ''
          },
          ['.']
        );
      });
    });
  }
}

export default new JestPlugin();
