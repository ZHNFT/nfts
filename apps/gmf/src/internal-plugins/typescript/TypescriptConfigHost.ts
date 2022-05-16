import ts from "typescript";
import fs from "fs";
import path from "path";
import { glob } from "@nfts/node-utils-library";

export class TypescriptConfigHost implements ts.ParseConfigHost {
  useCaseSensitiveFileNames = false;

  // 默认设置的 incldue 在src目录下
  defaultIncludeFiles = "./src/**/*.{js,ts,jsx,tsx}";

  //  默认 exclude 的文件，包括 node_modules 以及一些测试文件
  defaultExcludeFiles = [
    "**/node_modules/**",
    "**/*.{spec,test}.{js,ts,jsx,tsx}",
    "**/__tests__/**/*.{spec,test}.{js,ts,jsx,tsx}",
  ];

  public fileExists(path: string): boolean {
    return fs.existsSync(path);
  }

  public readDirectory(
    rootDir: string,
    extensions: string[],
    excludes: string[] | undefined,
    includes: string[]
  ): readonly string[] {
    return glob.sync(
      includes.length === 0 ? this.defaultIncludeFiles : includes,
      {
        cwd: rootDir,
        onlyFiles: true,
        // Hardcode exclude file for possible test files
        ignore: excludes
          ? excludes.map((excludePattern) => {
              return path.relative(rootDir, path.resolve(excludePattern));
            })
          : this.defaultExcludeFiles,
      }
    );
  }

  public readFile(path: string): string | undefined {
    try {
      return fs.readFileSync(path).toString("utf-8");
    } catch (error) {
      return undefined;
    }
  }
}
