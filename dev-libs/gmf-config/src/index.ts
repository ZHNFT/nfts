import { loadJsonSync } from '@gmf/node-utils';

export interface ConfigInitOptions {
  cwd: string;
  configFile: string;
}

export class ConfigBase {
  #_cwd: string;
  #_configFilePath: string;

  config: unknown;

  constructor({ cwd, configFile }: ConfigInitOptions) {
    this.#_cwd = cwd;
    this.#_configFilePath = configFile;
  }

  /**
   * @description 查看配置，并记录
   */
  lookup<T>(): T {
    if (this.config) {
      return this.config as T;
    }

    this.config = loadJsonSync<T>(this.#_configFilePath);

    return this.config as T;
  }

  get cwd(): string {
    return this.#_cwd;
  }

  get configPath(): string {
    return this.#_configFilePath;
  }
}
