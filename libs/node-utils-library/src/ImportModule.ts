import { createRequire } from 'module';

export class ImportModule {
  public static use(moduleName: string): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createRequire(process.cwd())(moduleName);
  }
}
