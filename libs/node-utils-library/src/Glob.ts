/**
 * Minimal Glob Implementation
 * @status WIP
 */

// src/**/*    => ^src\/(.+)$
// src/**/*.ts => ^src\/(.+)(.ts)$
// src/*       => ^src\/(\w+)\/*.*
// src/*.ts    => ^src\/(\w+)\/*(.ts)

export class Glob {
  public static globToRegExp(globPattern: string, flags = ''): RegExp {
    let reStr = '';

    let i = 0;

    while (i < globPattern.length) {
      const char = globPattern[i];

      switch (char) {
        default:
          reStr += char;
          break;
      }

      i++;
    }

    return new RegExp(reStr, flags);
  }

  private static match(pattern: string): string[] {
    const fileNames: string[] = [];
    return fileNames;
  }

  /**
   * 测试给出的字符串是否匹配 glob 字符串
   * @param globPattern
   * @param name
   */
  public static test(globPattern: string, name: string): boolean {
    //
    return true;
  }

  /**
   * 同步地读取匹配规则的文件
   * @param globPattern
   */
  public static sync(
    globPattern: string,
    { rootDir = process.cwd() }: { rootDir: string }
  ): string[] {
    const names: string[] = [];
    const regExpPattern = Glob.globToRegExp(globPattern);

    return names;
  }
}
