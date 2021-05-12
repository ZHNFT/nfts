import { cjs, configFor, esm, filterPackages, rollupWatch } from "./packages";

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
      const config = configFor(pack, true);
      config.output = [esm(pack), cjs(pack)];

      const rollupWatcher = rollupWatch(config);

      rollupWatcher.on("event", (e) => {
        if (e.code === "START") {
          console.log("Starting rollup watcher process....");
        }

        if (e.code === "BUNDLE_END") {
          console.log(e.input, "-->", e.output.join(","));
          console.log("");
        }

        if (e.code === "ERROR") {
          console.log(e.error);
          rollupWatcher.close();
        }
      });
    })
  );
}
