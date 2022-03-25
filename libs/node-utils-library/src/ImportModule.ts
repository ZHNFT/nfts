import { createRequire } from 'module';
import * as process from 'process';

export class ImportModule {
  public static use(moduleName: string): any {
    return createRequire(process.cwd())(moduleName);
  }
}
