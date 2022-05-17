import ts from "typescript";
import fs from "fs";
import path from "path";
import { glob } from "@nfts/node-utils-library";
import Constants from "./Constants";

export class TypescriptConfigHost implements ts.ParseConfigHost {
  useCaseSensitiveFileNames = false;

  public fileExists(path: string): boolean {
    return fs.existsSync(path);
  }

  public readDirectory(
    rootDir: string,
    extensions: string[],
    excludes: string[] | undefined,
    includes: string[]
  ): readonly string[] {
    return glob.sync(includes.length === 0 ? Constants.includes : includes, {
      cwd: rootDir,
      onlyFiles: true,
      // Hardcode exclude file for possible test files
      ignore: excludes
        ? excludes.map((excludePattern) => {
            return path.relative(rootDir, path.resolve(excludePattern));
          })
        : Constants.excludes,
    });
  }

  public readFile(path: string): string | undefined {
    try {
      return fs.readFileSync(path).toString("utf-8");
    } catch (error) {
      return undefined;
    }
  }
}
