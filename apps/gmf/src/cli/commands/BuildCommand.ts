import { Command } from '@nfts/noddy';
import { FlagParameter, StringParameter } from '@nfts/argparser';
import { BuildStage } from '../../stages/BuildStage';

const BUILD_LIFECYCLE_NAME = 'build';
const BUILD_LIFECYCLE_DESC = 'Run build process';

export interface BuildCommandInitOption {
  stage: BuildStage;
}

export interface BuildCommandLineParameters {
  clean: FlagParameter;
  test: FlagParameter;
  watch: FlagParameter;
  tsconfig: StringParameter;
}

export interface BuildCommandLineParametersValue {
  clean?: boolean;
  test?: boolean;
  watch?: boolean;
  tsconfig?: string;
}

export class BuildCommand extends Command implements BuildCommandLineParameters {
  readonly stage: BuildStage;

  clean: FlagParameter;
  test: FlagParameter;
  watch: FlagParameter;
  tsconfig: StringParameter;

  constructor({ stage }: BuildCommandInitOption) {
    super({
      commandName: BUILD_LIFECYCLE_NAME,
      commandDescription: BUILD_LIFECYCLE_DESC
    });

    this.stage = stage;
  }

  onDefineParameters(): void {
    /*
      TODO
        CleanUp插件，或者是使用 tsc 自带的 --clean 来实现清理逻辑？
    */
    this.clean = this.flagParameter({
      name: '--clean',
      summary: 'Delete the outputs of all projects.'
    });
    /*
      TODO
        需要一个插件来接入构建结束后的动作，以运行 JEST 测试；
    */
    this.test = this.flagParameter({
      name: '--test',
      summary: 'Run all test case, after build.'
    });
    /* 启动开发服务器 */
    this.watch = this.flagParameter({
      name: '--watch',
      summary: 'Watch input files.'
    });
    /* tsconfig配置 */
    this.tsconfig = this.stringParameter({
      name: '--tsconfig',
      summary: `Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.`
    });
  }

  public async onExecute(): Promise<void> {
    const parameters: BuildCommandLineParametersValue = {
      clean: this.clean.value,
      test: this.test.value,
      watch: this.watch.value,
      tsconfig: this.tsconfig.value
    };

    await this.stage.executeAsync();
  }
}
