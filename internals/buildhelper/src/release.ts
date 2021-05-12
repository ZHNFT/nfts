import build from "./build";
import { crossSpawnSync, updateVersion, revertVersion } from "./utils";
import { Package } from "./packages";

export type ReleaseTypes = "major" | "minor" | "patch";

export function publish(
  pack: Package,
  success: () => void,
  failed: (e: Error) => void
) {
  const { root } = pack;
  const result = crossSpawnSync("npm publish", {
    cwd: root,
    stdio: "inherit",
  });

  if (result.error) {
    failed(result.error);
  }

  if (result.status === 0) {
    success();
  }
}

export function git(pack: Package) {
  const gitStatus = crossSpawnSync("git status", {
    cwd: pack.root,
  });

  if (gitStatus.output) {
    // code...
  }
}

export default async function release(
  scope: string[],
  ignore: string[],
  type: ReleaseTypes
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
