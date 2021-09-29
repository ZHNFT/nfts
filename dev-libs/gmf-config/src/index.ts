import { loadJsonSync } from '@gmf/node-utils';

export interface ConfigInitOptions {
  cwd: string;
  configFile: string;
}

export class ConfigBase<T extends unknown> {
  readonly #_cwd: string;
  readonly #_configFilePath: string;

  config: T;

  constructor({ cwd, configFile }: ConfigInitOptions) {
    this.#_cwd = cwd;
    this.#_configFilePath = configFile;
  }

  /**
   * @description 查看配置，并记录
   */
  lookup(): T {
    if (this.config) {
      return this.config as T;
    }

    try {
      this.config = loadJsonSync<T>(this.#_configFilePath);
      return this.config as T;
    } catch (e) {
      throw Error(`加载配置文件失败，配置文件路径${this.#_configFilePath}`);
    }
  }

  /**
   * @public
   * @description 获取配置所处的目录路径
   *
   */
  get cwd(): string {
    return this.#_cwd;
  }

  /**
   * @public
   * @description 获取配置所处的文件路径
   *
   */
  get configPath(): string {
    return this.#_configFilePath;
  }
}
