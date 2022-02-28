import { Hookable, HookCallback } from 'hookable';
import { BaseArg } from './BaseArg';

export interface IBuildArgOptions {
  clean: boolean;
}

export interface IBuildHooks {
  preBuildPhase: Hookable;
  buildPhase: Hookable;
  afterBuildPhase: Hookable;
}

export interface IBuildPluginContext {
  hooks: IBuildHooks;
}

export class BuildArg extends BaseArg implements IBuildHooks {
  readonly preBuildPhase: Hookable<Record<string, HookCallback>, string>;
  readonly buildPhase: Hookable<Record<string, HookCallback>, string>;
  readonly afterBuildPhase: Hookable<Record<string, HookCallback>, string>;

  constructor() {
    super({ name: 'build', description: 'build your app' });

    this.preBuildPhase = new Hookable<Record<string, HookCallback>, string>();
    this.buildPhase = new Hookable<Record<string, HookCallback>, string>();
    this.afterBuildPhase = new Hookable<Record<string, HookCallback>, string>();

    const buildArgContext: IBuildPluginContext = {
      hooks: {
        preBuildPhase: this.preBuildPhase,
        buildPhase: this.buildPhase,
        afterBuildPhase: this.afterBuildPhase
      }
    };
  }

  onOptionsDefine(): void {
    this.option({
      name: '--clean',
      required: false,
      description: 'Cleanup dist folder'
    });
  }

  exec(args: IBuildArgOptions): void {
    console.log('build');
  }

  initPlugins(): void {
    //
  }
}
