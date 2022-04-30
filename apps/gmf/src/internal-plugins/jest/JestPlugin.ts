import { runCLI } from '@jest/core';
import { Plugin, PluginContext } from '../../classes/Plugin';

const NAME = 'JestPlugin';
const DESCRIPTION = 'Jest Runner Plugin For Gmf';

export interface IJestPluginOpts {
  fake?: boolean;
}

class JestPlugin implements Plugin {
  readonly name = NAME;
  readonly summary = DESCRIPTION;

  apply(ctx: PluginContext): void | Promise<void> {
    ctx.hooks.build.add(NAME, build => {
      build.hooks.compile.add(NAME, compile => {
        compile.hooks.run.add(NAME, async () => {
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
    });
  }
}

export default new JestPlugin();
