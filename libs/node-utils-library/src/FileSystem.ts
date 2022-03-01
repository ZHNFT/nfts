import * as fs from 'fs';
import { IJson } from './Json';

export class FileSystem {
  public static readJsonSync(path: string): IJson {
    return FileSystem.captureErrorSync<IJson>(() => {
      const buf = fs.readFileSync(path);
      return JSON.parse(buf.toString('utf-8')) as IJson;
    });
  }

  public static writeJsonSync(path: string, data: IJson): void {
    FileSystem.captureErrorSync<void>(() => {
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
    });
  }

  //
  //
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static captureErrorSync<TResult>(fn: () => TResult): TResult {
    try {
      return fn();
    } catch (e) {
      console.log(e);
    }
  }

  public static async captureErrorAsync<TResult>(
    fn: () => Promise<TResult>
  ): Promise<TResult> {
    try {
      return await fn();
    } catch (e) {
      console.log(e);
    }
  }
}
