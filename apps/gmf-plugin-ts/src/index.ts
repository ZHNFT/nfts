import { PluginImpl } from '../../gmf-cli/dist/cli/framework/PluginManager';
import { spawnSync } from 'child_process';

const plugin: PluginImpl = (api, options: { configFilePath: string }) => {
  api.hooks.build.tap('plugin-ts', async () => {
    /// 执行指令就完了，😩
    spawnSync('tsc', ['--build', '--verbose'], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
  });
};

export default plugin;
