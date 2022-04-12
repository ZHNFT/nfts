import ts from 'typescript';
import glob from 'glob';

export class TypescriptConfigHost implements ts.ParseConfigHost {
  useCaseSensitiveFileNames: boolean;

  fileExists(path: string): boolean {
    return false;
  }

  readDirectory(
    rootDir: string,
    extensions: readonly string[],
    excludes: readonly string[] | undefined,
    includes: readonly string[],
    depth?: number
  ): readonly string[] {
    const files: string[] = [];

    return files;
  }

  readFile(path: string): string | undefined {
    return undefined;
  }
}
