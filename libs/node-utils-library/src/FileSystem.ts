import * as fs from 'fs';

export class FileSystem {
  public static readJsonSync<T = unknown>(path: string): T {
    return FileSystem.captureErrorSync<T>(() => {
      const buf = fs.readFileSync(path);
      return JSON.parse(buf.toString('utf-8')) as T;
    });
  }

  public static writeJsonSync(path: string, data: unknown): void {
    FileSystem.captureErrorSync<void>(() => {
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected static captureErrorSync<TResult>(fn: () => TResult): TResult {
    try {
      return fn();
    } catch (e) {
      console.log(e);
    }
  }

  protected static async captureErrorAsync<TResult>(
    fn: () => Promise<TResult>
  ): Promise<TResult> {
    try {
      return await fn();
    } catch (e) {
      console.log(e);
    }
  }
}
