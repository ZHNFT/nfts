import { spawnSync, exec } from 'child_process';
import { Fs } from '@nfts/node-utils-library';
import { ICreationParameterValue } from '.';

export class Generator {
  public static async run(opts: ICreationParameterValue) {
    const { ts, platform } = opts;
    const localUsr = await Generator.getCurrentUserInfo();
  }

  public static async getCurrentUserInfo(): Promise<{ name: string; email: string } | undefined> {
    try {
      const name = spawnSync('git', ['config', '--global', 'user.name']).stdout.toString();
      const email = spawnSync('git', ['config', '--global', 'user.email']).stdout.toString();
      return {
        name,
        email
      };
    } catch (e) {
      return undefined;
    }
  }
}
