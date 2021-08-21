import { GmfPlugin } from './GmfPlugin';
import { GmfAction } from './GmfAction';

export class GmfConfiguration {
  #name: string;
  #description: string;

  plugins: GmfPlugin[];
  actions: GmfAction[];

  constructor({ name, description }: { name: string; description: string }) {
    this.#name = name;
    this.#description = description;
  }

  /**
   * @param cwd
   * @description 访问配置文件
   */
  public lookup({ cwd, configPath }: { cwd: string; configPath: string }) {
    //
  }
}
