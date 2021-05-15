/// Packages
import { dirname, resolve, basename } from "path";
import { existsSync, readdirSync, readFileSync } from "fs";
import { glob } from "glob";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-typescript2";
import eslint from "@rollup/plugin-eslint";
import apiExtractor from "@initializer/plugin-api-extractor";

import { isUsingNpm, isUsingPnpm, isUsingYarn } from "./utils";
import { load } from "js-yaml";
import {
  InputOptions,
  OutputOptions,
  rollup,
  RollupBuild,
  RollupOptions,
  RollupWatcher,
  RollupWatchOptions,
  watch,
} from "rollup";

const cwd = process.cwd();

export interface PackageJson {
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
  peerDependencies?: { [key: string]: string };
  main: string;
  version: string;
  workspaces?: string[];
  exports: {
    node: string;
    default: string;
  };
  [key: string]: unknown;
}

const packCache: Map<string, Package> = new Map([]);

export class Package {
  root: string;
  src: string | null;
  dirs: readonly string[];
  tests: readonly string[];
  json: PackageJson;

  constructor(readonly main: string) {
    const root = resolve(cwd, main),
      tests = resolve(root, "tests");
    this.dirs = [];

    const dirs = [...this.dirs];

    if (existsSync(tests)) {
      dirs.push(tests);
      this.tests = readdirSync(tests).filter((file) => /\*.ts/.test(file));
    } else {
      this.tests = [];
    }

    this.root = root;
    this.json = JSON.parse(
      readFileSync(resolve(root, "package.json")).toString("utf-8")
    ) as PackageJson;
    if (this.json.main) {
      this.src = resolve(root, dirname(this.json.main));
      dirs.push(this.src);
    } else {
      this.src = null;
    }
    this.dirs = dirs;
  }

  get(main: string): Package | undefined {
    if (packCache.has(main)) {
      return packCache.get(main);
    }
    const pack = new Package(main);
    packCache.set(main, pack);
    return pack;
  }
}

/// find packages in current workspace
/// [yarn/npm] workspaces field in package.json
///     [pnpm] packages field in pnpm-workspace.yaml
function packages(): string[] {
  let _packs: string[] = [];

  if (isUsingNpm || isUsingYarn) {
    try {
      _packs =
        (JSON.parse(
          readFileSync(resolve(cwd, "package.json")).toString()
        ) as PackageJson).workspaces ?? [];
    } catch (e) {
      console.error(e);
    }
  }

  if (isUsingPnpm) {
    try {
      _packs =
        (load(
          readFileSync(resolve(cwd, "pnpm-workspace.yaml"), {
            encoding: "utf-8",
          }),
          { json: true }
        ) as {
          packages: string[];
        }).packages ?? [];
    } catch (e) {
      console.error(e);
    }
  }

  return _packs;
}

function getPackages(): string[] {
  const workspaces = packages();

  return workspaces.reduce((a: string[], c) => {
    return a.concat(glob.sync(c, {}));
  }, []);
}

export function filterPackages(scope: string[], ignore: string[]): Package[] {
  const allPackages = getPackages();

  if (allPackages.length === 0) {
    return [new Package(".")];
  }

  return getPackages()
    .filter((pack: string) => {
      const pkg = pack.split("/")[1];
      return scope.includes(pkg) && !ignore.includes(pkg);
    })
    .map((pack: string) => {
      return new Package(pack);
    });
}

/// generate rollup bundle
export async function rollupBundle(option: InputOptions): Promise<RollupBuild> {
  const { input, plugins, external } = option;

  return rollup({
    input,
    plugins,
    external,
  });
}

// generate rollup watcher
export function rollupWatch(options: RollupWatchOptions): RollupWatcher {
  return watch(options);
}

/// esm
export function esm(pack: Package): OutputOptions {
  return {
    format: "esm",
    exports: "auto",
    file: resolve(pack.root, pack.json.exports.default),
  };
}

/// commonjs
export function cjs(pack: Package): OutputOptions {
  return {
    format: "cjs",
    exports: "auto",
    file: resolve(pack.root, pack.json.exports.node),
  };
}

/// write file to fs
export async function emit(
  bundle: RollupBuild,
  output: OutputOptions
): Promise<void> {
  await bundle.generate(output);
  const bundleOutput = await bundle.write(output);

  const { output: _outputs } = bundleOutput;

  console.log(`[@rays/buildhelper] write file ${_outputs[0].fileName}`);
}

/// generate rollup configuration
export function configFor(pack: Package, isDev: boolean): RollupOptions {
  const option: RollupOptions = {};

  const {
    peerDependencies,
    dependencies,
    main,
    exports: moduleExports,
  } = pack.json;

  if (!main || !moduleExports) {
    console.error(
      `[@rays/buildhelper] package ${pack.main} has no \`main\` and \`exports\` fields in package.json`
    );
    process.exit(2);
  }

  option.external = [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {}),
  ];

  option.plugins = [
    eslint({}),
    ts({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          target: "es6",
          declaration: true,
          outDir: resolve(pack.root, "lib"),
          declarationDir: resolve(pack.root, "temp"),
        },
        include: [pack.src],
      },
    }),
    apiExtractor({
      clear: true,
      cwd: pack.root,
      mainEntryPointFilePath: resolve(
        pack.root,
        "temp",
        basename(pack.json.main).replace(/\.tsx?$/, ".d.ts")
      ),
    }),
    commonjs(),
    nodeResolve({
      moduleDirectories: [resolve(pack.root, "node_modules")],
    }),
  ];
  option.input = resolve(pack.root, main);
  option.watch = isDev
    ? {
        clearScreen: true,
      }
    : false;

  return option;
}
