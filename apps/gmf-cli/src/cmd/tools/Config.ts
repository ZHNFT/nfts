import * as path from 'path';
import * as fs from 'fs';

export class Config<T> {
  readonly #_cwd: string;
  readonly #_configFile: string;

  constructor({ cwd, configFile }: { cwd: string; configFile: string }) {
    this.#_cwd = cwd;
    this.#_configFile = configFile;
  }

  lookup(): T {
    const config = {} as T;
    let configFilePath = this.#_configFile;

    if (!path.isAbsolute(this.#_configFile)) {
      configFilePath = path.resolve(this.#_cwd, this.#_configFile);
    }

    const fsdata = fs.readFileSync(configFilePath, { encoding: 'utf-8' });

    /// todo: add log here
    return config;
  }
}
