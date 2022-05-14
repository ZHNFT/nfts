import { spawnSync } from 'child_process';
import { ICreationParameters, Platforms } from '.';
import { PackageJson, Execution, Utilities } from '@nfts/node-utils-library';
import { Linter } from 'eslint';
import type { Config } from 'prettier';

export type TUserInfo = { name: string; email: string };
export type TPackageJsonInfo = { usingTs?: boolean; platform?: keyof typeof Platforms };

export class Generator {
  // 所有待创建的文件都先缓存在该数据结构中
  private static fileEmitTasks: Execution.TTask<undefined, void>[];

  public static run(opts: ICreationParameters, cwd: string = process.cwd()) {
    // 重置所有文件写入的 TASK
    this.fileEmitTasks = [];

    const { ts, platform } = opts;
    const localUsr = Generator.getCurrentUserInfo();
    const packageJsonContent = Generator.getPackageJson(localUsr);
  }

  /*
   * 获取当前用户的 git user 配置信息
   * */
  public static getCurrentUserInfo(): TUserInfo | undefined {
    try {
      const name = spawnSync('git', ['config', '--global', 'user.name']).stdout.toString();
      const email = spawnSync('git', ['config', '--global', 'user.email']).stdout.toString();
      return {
        name: name.replace('\n', ''),
        email: email.replace('\n', '')
      };
    } catch (e) {
      return {
        name: '',
        email: ''
      };
    }
  }

  // 生成 package.json 文件
  private static getPackageJson(userInfo: TUserInfo, opts?: TPackageJsonInfo): PackageJson.IPackageJson {
    opts = Utilities.object.merge(
      {
        usingTs: true,
        platform: Platforms.node
      },
      opts ?? {}
    ) as TPackageJsonInfo;

    const dependencies = ['@nfts/gmf', '@nfts/eslint-config'];
    const devDependencies = ['@types/jest', '@types/node'];

    const testPackage = ['jest', 'ts-jest'];

    if (opts.usingTs) {
      dependencies.push('typescript');
    }

    switch (opts.platform) {
      case 'node':
        break;
      case 'web':
        break;
      default:
        break;
    }

    return {
      name: 'new_project',
      version: '0.0.1',
      main: './dist/index.js',
      types: './dist/index.d.ts',
      author: {
        name: userInfo.name,
        email: userInfo.email,
        url: ''
      },
      publishConfig: {
        access: 'public'
      },
      scripts: {
        test: 'gmf build --test',
        dev: 'gmf build --watch',
        build: 'gmf build --test --clean'
      },
      devDependencies: {
        '@types/jest': '~27.5.1',
        '@types/node': '~17.0.5',
        jest: '~27.4.5',
        'ts-jest': '~27.1.2',
        typescript: '~4.5.4'
      },
      prettier: this.getPrettierConfig()
    };
  }

  private static getPrettierConfig(): Config {
    return {
      printWidth: 120,
      endOfLine: 'auto',
      singleQuote: true,
      trailingComma: 'none',
      arrowParens: 'avoid'
    };
  }

  private static makeFileTask(filePath: string, content: string) {
    //
  }
}
