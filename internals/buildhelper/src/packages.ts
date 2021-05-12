/// Packages
/// transpile TS with TypeScript, bundle files with Rollup
import { resolve, dirname } from "path";
import { existsSync, readFileSync, readdirSync } from "fs";
import { glob } from "glob";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-typescript2";
import eslint from "@rollup/plugin-eslint";

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
  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
  peerDependencies: { [key: string]: string };
  main: string;
  [key: string]: any;
}

const packCache: Map<string, Package> = new Map();

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

    let dirs = [...this.dirs];

    if (existsSync(tests)) {
      dirs.push(tests);
      this.tests = readdirSync(tests).filter((file) => /\*.ts/.test(file));
    } else {
      this.tests = [];
    }

    this.root = root;
    this.json = JSON.parse(
      readFileSync(resolve(root, "package.json")).toString("utf-8")
    );
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

function packages() {
  if (isUsingNpm || isUsingYarn) {
    try {
      return JSON.parse(readFileSync(resolve(cwd, "package.json")).toString())
        .workspaces;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  }

  if (isUsingPnpm) {
    try {
      return (load(
        readFileSync(resolve(cwd, "pnpm-workspace.yaml"), {
          encoding: "utf-8",
        }),
        { json: true }
      ) as PackageJson).packages;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  }

  return [];
}

function getPackages(): string[] {
  const workspaces = packages();

  return workspaces
    .map((workspace: string) => {
      return glob.sync(workspace, {});
    })
    .flat()
    .map((workspace: string[]) => {
      return workspace;
    });
}

export function filterPackages(scope: string[], ignore: string[]): Package[] {
  return getPackages()
    .filter((pack: string) => {
      const pkg = pack.split("/")[1];
      return scope.includes(pkg) && !ignore.includes(pkg);
    })
    .map((pack: string) => {
      return new Package(pack);
    });
}

export async function rollupBundle(option: InputOptions): Promise<RollupBuild> {
  const { input, plugins, external } = option;

  return rollup({
    input,
    plugins,
    external,
  });
}

export function rollupWatch(options: RollupWatchOptions): RollupWatcher {
  return watch(options);
}

// esm
export function esm(pack: Package): OutputOptions {
  return {
    format: "esm",
    exports: "auto",
    file: resolve(pack.root, pack.json.exports.default),
  };
}

// commonjs
export function cjs(pack: Package): OutputOptions {
  return {
    format: "cjs",
    exports: "auto",
    file: resolve(pack.root, pack.json.exports.node),
  };
}

export async function emit(bundle: RollupBuild, output: OutputOptions) {
  await bundle.generate(output);
  const bundleOutput = await bundle.write(output);

  const { output: _outputs } = bundleOutput;

  console.log(`[@rays/buildhelper] write file ${_outputs[0].fileName}`);
}

export function configFor(pack: Package, isDev: boolean): RollupOptions {
  const option: RollupOptions = {};

  const {
    peerDependencies = {},
    dependencies = {},
    main,
    exports: moduleExports,
  } = pack.json;

  if (!main || !moduleExports) {
    console.log(
      `[@rays/toolkit] ignore package ${pack.main} without \`main\` field and \`exports\` field`
    );
  }

  option.external = [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
  ];

  const plugins = [
    eslint({}),
    ts({
      tsconfigOverride: {
        compilerOptions: {
          target: "es6",
        },
        include: [pack.src], //resolve(pack.root, dirname(pack.json.main))
      },
    }),
    commonjs(),
    nodeResolve({
      moduleDirectories: [resolve(pack.root, "node_modules")],
    }),
  ];

  option.plugins = plugins;
  option.input = resolve(pack.root, main);
  option.watch = isDev
    ? {
        clearScreen: true,
      }
    : false;

  return option;
}
