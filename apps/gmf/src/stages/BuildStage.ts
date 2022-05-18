import { AsyncHook } from "@nfts/hook";
import { Stage, StageSubHook, StageCommonContext } from "../classes/Stage";
import { BuildCommandLineParametersValue } from "../cli/commands/BuildCommand";

export class CompileSubStageHooks extends StageSubHook {
  readonly afterCompile: AsyncHook = new AsyncHook();
}

export class PreCompileSubStageHooks extends StageSubHook {}

export class LintSubStageHooks extends StageSubHook {}

export class BuildStageHooks {
  readonly preCompile = new AsyncHook<
    StageCommonContext<BuildCommandLineParametersValue, PreCompileSubStageHooks>
  >();
  readonly lint = new AsyncHook<
    StageCommonContext<BuildCommandLineParametersValue, LintSubStageHooks>
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

    const preCompileSubContext = {
      hooks: new PreCompileSubStageHooks(),
      cmdParams: parameters,
    };

    // Pre-compile
    await this.hooks.preCompile.call(preCompileSubContext);
    await BuildStage._runSubStageHooks(
      "preCompile",
      preCompileSubContext.hooks
    );

    const lintSubContext = {
      hooks: new LintSubStageHooks(),
      cmdParams: parameters,
    };

    // Lint
    await this.hooks.lint.call(lintSubContext);
    await BuildStage._runSubStageHooks("test", lintSubContext.hooks);

    const compileSubContext = {
      hooks: new CompileSubStageHooks(),
      cmdParams: parameters,
    };

    // Build
    await this.hooks.compile.call(compileSubContext);
    await BuildStage._runSubStageHooks("compile", compileSubContext.hooks);
  }

  private static async _runSubStageHooks(_: string, hooks: StageSubHook) {
    await hooks.run.call(undefined);
  }
}
