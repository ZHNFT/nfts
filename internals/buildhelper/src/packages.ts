/// Packages
/// transpile TS with TypeScript, bundle files with Rollup
import { resolve, dirname } from "path";
import { existsSync, readFileSync, readdirSync } from "fs";
// import type { RollupOptions } from "rollup";
import { glob } from "glob";

import { isUsingNpm, isUsingPnpm, isUsingYarn } from "./utils";
import { load } from "js-yaml";

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
  // bundleConfig: RollupOptions;
  constructor(readonly main: string) {
    const root = resolve(cwd, main),
      tests = resolve(root, "tests;");
    this.dirs = [];

    let dirs = [...this.dirs];

    if (existsSync(tests)) {
      // dirs.push(tests);
      // add test files to this.tests
      this.tests = readdirSync(tests).filter((file) => /\*.ts/.test(file));
    } else {
      this.tests = [];
    }

    dirs = dirs.concat(this.tests);

    this.root = root;
    // this.dirs = dirs;
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

// function tsConfig() {}

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
