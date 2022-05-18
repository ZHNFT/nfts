import { AsyncHook } from "@nfts/hook";
import { Stage, StageSubHook, StageCommonContext } from "../classes/Stage";
import { BuildCommandLineParametersValue } from "../cli/commands/BuildCommand";

export class CompileSubStageHooks extends StageSubHook {
  readonly afterCompile: AsyncHook = new AsyncHook();
}

export class PreCompileSubStageHooks extends StageSubHook {}

export class TestSubStageHooks extends StageSubHook {}

export class BuildStageHooks {
  readonly preCompile = new AsyncHook<
    StageCommonContext<BuildCommandLineParametersValue, PreCompileSubStageHooks>
  >();
  readonly lint = new AsyncHook<
    StageCommonContext<BuildCommandLineParametersValue, TestSubStageHooks>
  >();
  readonly compile = new AsyncHook<
    StageCommonContext<BuildCommandLineParametersValue, CompileSubStageHooks>
  >();
}

export class BuildStage extends Stage<
  BuildStageHooks,
  unknown,
  unknown,
  BuildCommandLineParametersValue
> {
  constructor() {
    super({
      hooks: new BuildStageHooks(),
    });
  }

  async executeAsync(
    parameters: BuildCommandLineParametersValue
  ): Promise<void> {
    await this.executeInnerHook(parameters);

    const compileSubContext = {
      hooks: new CompileSubStageHooks(),
      cmdParams: parameters,
    };

    // Pre-compile
    await this.hooks.preCompile.call(compileSubContext);
    await BuildStage._runSubStageHooks("preCompile", compileSubContext.hooks);

    // Test
    await this.hooks.lint.call(compileSubContext);
    await BuildStage._runSubStageHooks("test", compileSubContext.hooks);

    // Build
    await this.hooks.compile.call(compileSubContext);
    await BuildStage._runSubStageHooks("compile", compileSubContext.hooks);
  }

  private static async _runSubStageHooks(_: string, hooks: StageSubHook) {
    await hooks.run.call(undefined);
  }
}
