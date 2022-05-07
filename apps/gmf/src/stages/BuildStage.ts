import { AsyncHook } from '@nfts/hook';
import { Stage, StageSubHook, StageCommonContext } from '../classes/Stage';
import { BuildCommandLineParametersValue } from '../cli/commands/BuildCommand';

/*
buildStage
  - compile
    - run
  - recompile
    - run
  - afterCompile
    - run
*/

export class CompileSubStageHooks extends StageSubHook {
	readonly afterCompile: AsyncHook = new AsyncHook();
}

export class BuildStageHooks {
	readonly compile: AsyncHook<StageCommonContext<BuildCommandLineParametersValue, CompileSubStageHooks>> =
		new AsyncHook<StageCommonContext<BuildCommandLineParametersValue, CompileSubStageHooks>>();
}

export class BuildStage extends Stage<BuildStageHooks, unknown, unknown, BuildCommandLineParametersValue> {
	constructor() {
		super({
			hooks: new BuildStageHooks()
		});
	}

	async executeAsync(parameters?: BuildCommandLineParametersValue): Promise<void> {
		await this.executeInnerHook(parameters);

		const compileSubContext = {
			hooks: new CompileSubStageHooks(),
			cmdParams: parameters
		};

		await this.hooks.compile.call(compileSubContext);
		await this._runSubStageHooks('Compile', compileSubContext.hooks);
	}

	private async _runSubStageHooks(_: string, hooks: StageSubHook) {
		await hooks.run.call();
	}
}
