/**
 * Minimal Glob Implementation
 */

// src/**/*    => ^src\/(.+)$
// src/**/*.ts => ^src\/(.+)(.ts)$
// src/*       => ^src\/(\w+)\/*.*
// src/*.ts    => ^src\/(\w+)\/*(.ts)

export class Glob {
  public static match(pattern: string, visitor: (fileName: string) => void): string[] {
    const fileNames: string[] = [];
    return fileNames;
  }
}
