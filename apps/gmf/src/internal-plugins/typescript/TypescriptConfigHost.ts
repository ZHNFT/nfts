import ts from 'typescript';
import fs from 'fs';
import { Fs } from '@nfts/node-utils-library';

export class TypescriptConfigHost implements ts.ParseConfigHost {
  useCaseSensitiveFileNames: boolean;

  public fileExists(path: string): boolean {
    return fs.existsSync(path);
  }

  public readDirectory(
    rootDir: string,
    extensions: readonly string[],
    excludes: readonly string[] | undefined,
    includes: readonly string[]
  ): readonly string[] {
    let files: string[] = [];

    if (includes.length === 0) {
      files = Fs.readDirRecursionSync('./src', { stat: false }) as string[];
    } else {
      for (let i = 0; i < includes.length; i++) {
        const includeGlobPattern = includes[i];
        const _files = Fs.readDirRecursionSync(includeGlobPattern, {
          stat: false
        }) as string[];
        files = files.concat(_files);
      }
    }

    return files;
  }

  public readFile(path: string): string | undefined {
    try {
      return fs.readFileSync(path).toString('utf-8');
    } catch (error) {
      return undefined;
    }
  }
}
