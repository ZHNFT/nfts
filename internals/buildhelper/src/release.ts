import build from "./build";
import { crossExecFileSync, updateVersion, revertVersion } from "./utils";
import { Package } from "./packages";

export enum ReleaseTypes {
  "major",
  "minor",
  "patch",
}

/// publish package to npm repo
export function publish(
  pack: Package,
  success: () => void,
  failed: (e: Error) => void
) {
  try {
    crossExecFileSync("npm", ["publish"], {
      cwd: pack.root,
    });
    success();
  } catch (e) {
    failed(e);
  }
}

/// commit/push modified/added/staged/removed files
export function git(pack: Package) {
  try {
    console.log("commiting files");
    crossExecFileSync("git", ["add", "."], { cwd: pack.root });
    crossExecFileSync(
      "git",
      ["commit", "-m", `release: release ${pack.main}@${pack.json.version}`],
      { cwd: pack.root }
    );
  } catch (e) {}
}

/// Release steps
/// 1. build package
/// 2. update package version
/// 3. sync your local repo to remote service
/// 4. publish package to npm service
export default async function release(
  scope: string[],
  ignore: string[],
  type: keyof typeof ReleaseTypes
) {
  console.log("[@rays/buildhelper] Start release process......");
  console.log("");
  /// build before release
  await build(scope, ignore).then(async (packs) => {
    await Promise.all(
      packs.map(async (pack) => {
        updateVersion(pack, type);
        publish(
          pack,
          () => git(pack),
          (e: Error) => {
            console.log(e.message);
            revertVersion(pack);
          }
        );
      })
    );
  });
}
