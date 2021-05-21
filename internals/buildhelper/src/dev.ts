import {
  cjs,
  esm,
  configFor,
  filterPackages,
  rollupWatch,
  Package,
} from "./packages";

process.env.NODE_ENV = "development";

let firstRun = true;

/// Build steps
/// 1. find packages with CLI arguments in workspace
/// 2. start watching process
export default async function development(
  scope: string[],
  ignore: string[]
): Promise<Package[]> {
  const packs = filterPackages(scope, ignore);

  // if (!packs || !packs.length) {
  //   console.error("no package found in workspaces");
  //   process.exit(2);
  // }
  console.log("");
  console.log(
    firstRun
      ? "[@rays/buildhelper] Starting development process......"
      : "[@rays/buildhelper] Restarting development process......"
  );

  packs.forEach((pack) => {
    const config = configFor(pack, true);
    config.output = [esm(pack), cjs(pack)];

    const rollupWatcher = rollupWatch(config);

    rollupWatcher.on("event", (e) => {
      if (e.code === "START") {
        console.log(
          firstRun
            ? "Starting rollup watcher process...."
            : "Restarting rollup watcher process...."
        );
        firstRun = false;
      }

      if (e.code === "BUNDLE_END") {
        console.log(e.input, "-->", e.output.join(","));
        console.log("");
      }

      if (e.code === "ERROR") {
        console.log(e.error);
      }
    });
  });

  return Promise.resolve(packs);
}
