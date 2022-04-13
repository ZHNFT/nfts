import ts from 'typescript';
import fs from 'fs';
import { glob } from 'glob';

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
    // depth?: number
  ): readonly string[] {
    let files: string[] = [];

    if (includes.length === 0) {
      files = this._globMatchFilesInRoot('**', { root: rootDir, ignore: excludes });
    } else {
      for (let i = 0; i < includes.length; i++) {
        const includeGlobPattern = includes[i];
        const _files = this._globMatchFilesInRoot(includeGlobPattern, {
          root: rootDir,
          ignore: excludes
        });
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

  private _globMatchFilesInRoot(
    globPattern: string,
    matchOption: {
      root: string;
      ignore?: readonly string[];
      extensions?: readonly string[];
    }
  ): string[] {
    return glob
      .sync(globPattern, {
        nodir: true,
        realpath: true,
        cwd: matchOption.root,
        ignore: ['node_modules/**/*', ...(matchOption?.ignore ?? [])]
      })
      .filter(fileName =>
        matchOption.extensions
          ? matchOption.extensions.includes(fileName.split('.')[1])
          : true
      );
  }
}
