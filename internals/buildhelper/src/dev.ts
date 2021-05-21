import {
  cjs,
  esm,
  configFor,
  filterPackages,
  rollupWatch,
  Package,
} from "./packages";
import { log } from "./utils";

process.env.NODE_ENV = "development";

const debug = log("dev");
let firstRun = true;

/// Build steps
/// 1. find packages with CLI arguments in workspace
/// 2. start watching process
export default async function development(
  scope: string[],
  ignore: string[]
): Promise<Package[]> {
  const packs = filterPackages(scope, ignore);

  debug("Starting development process...");

  for (let i = packs.length - 1; i >= 0; i--) {
    const pack = packs[i];
    const config = configFor(pack, true);
    config.output = [esm(pack), cjs(pack)];

    const rollupWatcher = rollupWatch(config);

    rollupWatcher.on("event", (e) => {
      if (e.code === "START") {
        debug(
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
  }

  return Promise.resolve(packs);
}
