import build from "./build";
import { crossExecFileSync, updateVersion, revertVersion } from "./utils";
import { Package } from "./packages";

export enum ReleaseTypes {
  "major",
  "minor",
  "patch",
}

/// publish package to npm repo
export function publish(pack: Package): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      ///
      /// 虽然使用pnpm做包管理，但是我们还是选择使用npm指令来发布包。
      ///
      crossExecFileSync("npm", ["publish"], {
        cwd: pack.root,
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

/// commit/push modified/added/staged/removed files
export function git(pack: Package): void {
  try {
    crossExecFileSync("git", ["add", "."], { cwd: pack.root });
    crossExecFileSync(
      "git",
      ["commit", "-m", `release: release ${pack.main}@${pack.json.version}`],
      { cwd: pack.root }
    );
  } catch (e) {
    console.error(e);
  }
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
): Promise<void> {
  console.log("[@rays/buildhelper] Start release process......");
  console.log("");
  /// build before release
  await build(scope, ignore).then((packs) => {
    packs.forEach((pack) => {
      console.log("");
      console.log(`publish ${pack.main} 🚗...`);
      updateVersion(pack, type);
      git(pack);
      publish(pack)
        .then(() => {
          console.log(`publish ${pack.main} successfully 🎆`);
          console.log("");
        })
        .catch((e) => {
          console.log(e);
          revertVersion(pack);
        });
    });
  });
}
