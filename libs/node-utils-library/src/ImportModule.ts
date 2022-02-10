import { createRequire } from 'module';

export abstract class ImportModuleProvider {
  abstract _require: NodeJS.Require;
  abstract use(moduleName: string): void;
}

export class ImportModule implements ImportModuleProvider {
  readonly _require: NodeJS.Require;

  constructor(baseModulePath: string) {
    this._require = createRequire(baseModulePath);
  }

  use<T extends unknown>(moduleName: string): T {
    return this._require(moduleName) as T;
  }
}
