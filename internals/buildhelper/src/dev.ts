import {
  filterPackages,
  rollupWatch,
  esm,
  cjs,
  emit,
  configFor,
} from "./packages";

export default function development(
  scope: string[],
  ignore: string[]
): Promise<unknown> {
  const packs = filterPackages(scope, ignore);

  if (!packs || !packs.length) {
    console.error("no package found in workspaces");
    process.exit(2);
  }

  console.log(`[@rays/toolkit] building...`);
  console.log("");

  return Promise.all(
    packs.map((pack) => {
      const rollupWatcher = rollupWatch(configFor(pack, true));

      rollupWatcher.on("event", (e) => {
        if (e.code === "START") {
          console.log("Starting rollup watcher process....");
        }

        if (e.code === "BUNDLE_END") {
          e.result.close();
          console.log("Bundle end");
        }

        if (e.code === "ERROR") {
          console.log(e.error);
          rollupWatcher.close();
        }
      });
    })
  );
}
