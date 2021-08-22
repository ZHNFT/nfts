import { GmfPlugin } from './GmfPlugin';
import { GmfAction } from './GmfAction';
import { fileExists } from '../../node-api/pathSystem';
import { NodeError } from '../../node-api/errors';

const ConfigFileName = 'gmf.json';

export class GmfConfiguration {
  #name: string;

  plugins: GmfPlugin[];
  actions: GmfAction[];

  constructor({ name }: { name: string }) {
    this.#name = name;
  }

  // @beta
  public lookup({ configPath }: { cwd: string; configPath: string }): void {
    fileExists(configPath)
      .then(() => {
        //  todo 读取文件，获取plugin以及event的信息
      })
      .catch((e: NodeError) => {
        console.error(e.name, e.description);
      });
  }
}
