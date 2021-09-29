import { PluginImpl } from '@gmf/gmf-cli/dist/cli/framework/PluginManager';
import { spawn } from 'child_process';

export type TSPluginOptions = {
  tsConfigFilePath?: string;
};

const plugin: PluginImpl = (api, options: TSPluginOptions) => {
  api.hooks.build.tap('plugin-ts', async ctx => {
    await spawn(
      'tsc',
      ['--project', options.tsConfigFilePath || 'tsconfig.json'],
      {
        stdio: 'inherit',
        cwd: process.cwd()
      }
    );
  });
};

export default plugin;
