import build from "./build";
import { crossExecFileSync, updateVersion, revertVersion } from "./utils";
import { Package } from "./packages";

export enum ReleaseTypes {
  "major",
  "minor",
  "patch",
}

export function publish(
  pack: Package,
  success: () => void,
  failed: (e: Error) => void
) {
  crossExecFileSync("npm", ["publish"], {
    cwd: pack.root,
  });
}

export function git(pack: Package) {
  crossExecFileSync("git status", ["status"], {
    cwd: pack.root,
  });
}

export default async function release(
  scope: string[],
  ignore: string[],
  type: keyof typeof ReleaseTypes
) {
  console.log("[@rays/buildhelper] Start release process......");

  await build(scope, ignore).then(async (packs) => {
    packs.forEach(async (pack) => {
      updateVersion(pack, type);
      publish(
        pack,
        () => {
          git(pack);
        },
        (e) => {
          console.error(e);
          revertVersion(pack);
        }
      );
    });
  });
}
