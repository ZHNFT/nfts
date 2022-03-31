import { createRequire } from 'module';
import { resolve } from 'path';

interface ImportModuleOptions {
  cwd?: string;
}

const defaultOptions = {
  cwd: process.cwd()
};

export class ImportModule {
  private static use(options: ImportModuleOptions = {}): NodeRequire {
    return createRequire(options.cwd);
  }

  public static lazy(moduleName: string, userOptions?: ImportModuleOptions): () => any {
    const _opts = Object.assign({}, defaultOptions, userOptions);
    const _req = ImportModule.use(_opts);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return _req(resolve(_opts.cwd, moduleName));
    };
  }

  public static import(moduleName: string, userOptions?: ImportModuleOptions): any {
    return this.lazy(moduleName, userOptions)();
  }
}
