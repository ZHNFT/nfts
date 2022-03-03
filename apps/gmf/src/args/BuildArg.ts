import { Hook, THookCallback } from '@ntfs/hook';

import { BaseArg } from './BaseArg';
import { GmfConfiguration } from '../config/GmfConfiguration';

export interface IBuildArgOptions {
  clean: boolean;
}

export interface IBuildHooks {
  readonly preBuildPhase: Hook;
  readonly buildPhase: Hook;
  readonly afterBuildPhase: Hook;
}

export interface IBuildPluginContext {
  readonly hooks: IBuildHooks;
  readonly config: GmfConfiguration;
}

export class BuildArg extends BaseArg implements IBuildHooks {
  readonly preBuildPhase: Hook;
  readonly buildPhase: Hook;
  readonly afterBuildPhase: Hook;

  constructor(opts: { config: GmfConfiguration }) {
    super({ name: 'build', description: 'build your app' });

    this.preBuildPhase = new Hook();
    this.buildPhase = new Hook();
    this.afterBuildPhase = new Hook();

    const buildArgContext: IBuildPluginContext = {
      config: opts.config,
      hooks: {
        preBuildPhase: this.preBuildPhase,
        buildPhase: this.buildPhase,
        afterBuildPhase: this.afterBuildPhase
      }
    };

    this.onLoadPlugins(buildArgContext);
  }

  public onOptionsDefine(): void {
    this.option({
      name: '--clean',
      required: false,
      description: 'Cleanup dist folder'
    });

    this.option({
      name: '--web',
      required: true,
      description: 'Using web config'
    });
  }

  public exec(args: IBuildArgOptions): void {
    console.log('build');
  }

  onLoadPlugins(args: IBuildPluginContext): void {
    //
  }
}
