import { PluginImpl } from '@gmf/gmf-cli/dist/cli/framework/PluginManager';
import { spawn } from 'child_process';

const plugin: PluginImpl = (api, options: { configFilePath: string }) => {
  api.logger.log('执行plugin-ts插件');

  api.hooks.build.tap('plugin-ts', async () => {
    api.logger.log('执行plugin-ts钩子函数');
    await spawn('tsc', ['--build', '--verbose'], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
  });
};

export default plugin;
