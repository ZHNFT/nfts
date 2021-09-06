import { PluginImpl } from '../../gmf-cli/dist/cli/framework/PluginManager';
import { spawnSync } from 'child_process';

const plugin: PluginImpl = (api, options: { configFilePath: string }) => {
  api.hooks.build.tap('plugin-ts', () => {
    console.log('Starting typescript compiler');

    spawnSync('tsc', ['--showConfig', '--listFilesOnly'], {
      stdio: 'inherit'
    });
  });
};

export default plugin;
