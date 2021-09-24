import { PluginImpl } from '@gmf/gmf-cli/dist/cli/framework/PluginManager';
import { spawn } from 'child_process';

const plugin: PluginImpl = (api, options: { tsConfigFilePath: string }) => {
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
