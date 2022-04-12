import ts from 'typescript';
import fs from 'fs';
import glob from 'glob';
import { resolve, dirname } from 'path';
import { Plugin, PluginContext } from '../classes/Plugin';

export class TypescriptRunner {
  public runTypescriptBuild() {
    const rootDir = process.cwd();
    const outputDir = resolve(rootDir, 'dist');
    const tsconfigPath = resolve(rootDir, 'tsconfig.json');

    const tsCompilerOptions: ts.CompilerOptions = {
      rootDir,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2016,
      outDir: outputDir,
      declaration: true,
      declarationDir: outputDir,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      incremental: true
    };

    const host = ts.createIncrementalCompilerHost(tsCompilerOptions);

    const parsedConfigFile = ts.readConfigFile(tsconfigPath, fileName => {
      return fs.readFileSync(fileName).toString('utf-8');
    });

    const tsconfig = ts.parseJsonConfigFileContent(
      parsedConfigFile.config,
      {
        fileExists(path: string): boolean {
          return fs.existsSync(path);
        },
        readFile(path: string): string | undefined {
          try {
            return fs.readFileSync(path).toString('utf-8');
          } catch (error) {
            return undefined;
          }
        },
        readDirectory(
          rootDir: string,
          extensions: readonly string[],
          excludes: readonly string[],
          includes: readonly string[] | undefined
          // depth?: number
        ) {
          let files: string[] = [];

          for (let i = 0; i < includes.length; i++) {
            const includePattern = includes[i];

            const fileNames = glob
              .sync(includePattern, {
                nodir: true,
                ignore: excludes,
                realpath: true,
                cwd: rootDir
              })
              .filter((fileName: string) => {
                return extensions.includes('.' + fileName.split('.')[1]);
              });

            files = files.concat(fileNames);
          }

          return files;
        },
        useCaseSensitiveFileNames: true
      },
      dirname(tsconfigPath),
      undefined,
      tsconfigPath
    );

    const program = ts.createProgram({
      host,
      rootNames: tsconfig.fileNames,
      options: tsconfig.options,
      projectReferences: tsconfig.projectReferences
    });

    program.emit(undefined, (fileName, data: string) => {
      const fileDirname = dirname(fileName);
      if (!fs.existsSync(dirname(fileName))) {
        fs.mkdirSync(fileDirname);
      }

      fs.writeFileSync(fileName, data);
    });
  }
  public runTypescriptWatch() {
    throw new Error('TypescriptRunner.runTypescriptWatch() is not implement yet!');
  }
}

interface TypescriptPluginOptions {
  // 开启 WatchMode；
  watch?: boolean;
  // 输出所有构建信息；
  verbose?: boolean;
  tsconfigPath?: string;
}

class TypescriptPlugin implements Plugin<TypescriptPluginOptions> {
  readonly name = 'TypescriptPlugin';
  readonly summary = '使用 tsc 作为内部使用的编译器来将 tsx 转换成 js';

  readonly _tsRunner: TypescriptRunner;

  constructor() {
    this._tsRunner = new TypescriptRunner();
  }

  apply(ctx: PluginContext, options?: TypescriptPluginOptions): void {
    ctx.hook.build.addHook(build => {
      build.compile.addHook(() => {
        if (options?.watch) {
          this._tsRunner.runTypescriptWatch();
        } else {
          this._tsRunner.runTypescriptBuild();
        }
      });
    });
  }
}

export default new TypescriptPlugin();
