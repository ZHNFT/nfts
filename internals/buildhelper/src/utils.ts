import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { execFileSync, ExecFileSyncOptions } from "child_process";
import { Package } from "./packages";
import { ReleaseTypes } from "./release";

const cwd = process.cwd();

export const isUsingPnpm = existsSync(resolve(cwd, "pnpm-lock.yaml"));
export const isUsingNpm = existsSync(resolve(cwd, "package-lock.json"));
export const isUsingYarn = existsSync(resolve(cwd, "yarn.lock"));

export function crossExecFileSync(
  command: string,
  options: ReadonlyArray<string> = [],
  config: ExecFileSyncOptions = {}
): string | Buffer {
  return execFileSync(command, options, {
    ...config,
    shell: process.platform === "win32",
  });
}

/// revert package version
export function revertVersion(pack: Package) {
  writeFileSync(
    resolve(pack.root, "package.json"),
    JSON.stringify(pack.json, null, 2)
  );
}

export function updateVersion(pack: Package, type: keyof typeof ReleaseTypes) {
  const { json, root } = pack;
  /// shallow copy， easy to revert version
  const copiedJson = Object.assign({}, json);
  const version = copiedJson.version;
  let [major, minor, patch] = version.split(".");
  switch (type) {
    case "major": {
      major = String(Number(major) + 1);
      minor = String(0);
      patch = String(0);
      break;
    }
    case "minor": {
      minor = String(Number(minor) + 1);
      patch = String(0);
      break;
    }
    case "patch": {
      patch = String(Number(patch) + 1);
      break;
    }
  }
  copiedJson.version = [major, minor, patch].join(".");
  writeFileSync(
    resolve(root, "package.json"),
    JSON.stringify(copiedJson, null, 2)
  );
}
