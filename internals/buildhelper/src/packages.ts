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

import { hasMoreThanOnePackageLock } from "./utils";
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

export interface DemoShape {
  root?: string;
}

const packCache: Map<string, Package> = new Map([]);

export class Package {
  root: string;
  src: string | null;
  dirs: readonly string[];
  tests: readonly string[];
  json: PackageJson;
  demo: DemoShape;

  constructor(readonly main: string) {
    const root = resolve(cwd, main),
      tests = resolve(root, "tests"),
      demo = resolve(root, "demo");
    this.dirs = [];
    this.demo = {};

    const dirs = [...this.dirs];

    if (existsSync(tests)) {
      dirs.push(tests);
      this.tests = readdirSync(tests).filter((file) => /\*.ts/.test(file));
    } else {
      this.tests = [];
    }

    if (existsSync(demo)) {
      this.demo = {
        root: demo,
      };
    }

    this.root = root;
    this.json = Package.loadPackageJson(resolve(root, "package.json"));
    if (this.json.main) {
      this.src = resolve(root, dirname(this.json.main));
      dirs.push(this.src);
    } else {
      this.src = null;
    }
    this.dirs = dirs;
  }

  get(main: string): Package | undefined {
    if (packCache.has(main)) return packCache.get(main);

    const pack = new Package(main);
    packCache.set(main, pack);
    return pack;
  }

  static loadPackageJson(packageJsonPath: string): PackageJson | never {
    if (typeof packageJsonPath !== "string" || existsSync(packageJsonPath)) {
      throw Error(`${packageJsonPath} is not provide or not exists`);
    }

    try {
      return JSON.parse(
        readFileSync(packageJsonPath).toString()
      ) as PackageJson;
    } catch (e) {
      throw Error(`failed to load packageJson from ${packageJsonPath}`);
    }
  }

  static loadPnpmWorkspaceYaml(
    pnpmWorkspaceYaml: string
  ): { packages: string[] } | never {
    if (
      typeof pnpmWorkspaceYaml !== "string" ||
      existsSync(pnpmWorkspaceYaml)
    ) {
      throw Error(`${pnpmWorkspaceYaml} is not provide or not exists`);
    }

    try {
      return load(
        readFileSync(resolve(cwd, "pnpm-workspace.yaml"), {
          encoding: "utf-8",
        }),
        { json: true }
      ) as {
        packages: string[];
      };
    } catch (e) {
      throw Error(
        `failed to load pnpm-workspace.yaml from ${pnpmWorkspaceYaml}`
      );
    }
  }
}

/// find packages in current workspace
/// [yarn/npm] workspaces field in package.json
///     [pnpm] packages field in pnpm-workspace.yaml
function packages(): string[] | never {
  /// multi package-manager is not allowd
  if (hasMoreThanOnePackageLock())
    throw Error(
      `detect two different package-manage tool, in this repo.\n please make sure you only use one of them, (npm, yarn, pnpm)`
    );

  if (isUsingPnpm) {
    return (
      Package.loadPackageJson(resolve(cwd, "package.json")).workspaces ?? []
    );
  }

  if (isUsingYarn || isUsingNpm) {
    return (
      Package.loadPnpmWorkspaceYaml(resolve(cwd, "pnpm-workspace.yaml"))
        .packages ?? []
    );
  }

  ///
  return [];
}

function getPackages(): string[] {
  const workspaces = packages();
  const syncPacks: string[] = [];
  for (let i = workspaces.length - 1; i >= 0; i--) {
    const work = workspaces[i];
    syncPacks.push(...glob.sync(work, {}));
  }

  return syncPacks;
}

/// filter package in workspaces
export function filterPackages(scope: string[], ignore: string[]): Package[] {
  const allPackages = getPackages();

  if (allPackages.length === 0) {
    return [new Package(".")];
  }

  const packs: Package[] = [];

  for (let i = allPackages.length - 1; i >= 0; i--) {
    const pack = allPackages[i];
    /// strict match
    const pkgName = pack.split("/")[1];
    if (scope.includes(pkgName) && !ignore.includes(pkgName)) {
      packs.push(new Package(pack));
    }
  }

  return packs;
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

/// write file to local
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
          allowSyntheticDefaultImports: true,
          jsx: "react",
        },
        include: [pack.src],
      },
    }),
    commonjs(),
    nodeResolve({
      moduleDirectories: [resolve(pack.root, "node_modules")],
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
  ];
  option.input = resolve(pack.root, main);
  option.watch = isDev
    ? {
        clearScreen: true,
      }
    : false;

  return option;
}
