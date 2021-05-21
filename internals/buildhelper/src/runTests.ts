import { run } from "jest";
import { log } from "./utils";
import { filterPackages, Package } from "./packages";

process.env.NODE_ENV = "test";

const debug = log("test");

function runTest(pack: Package) {
  run(
    [
      "--debug", ///
      "--colors", ///
      "--passWithNoTests", ///
    ],
    pack.root
  ).catch((e) => console.error(e));
}

export default async function runTests(
  scope: string[],
  ignore: string[]
): Promise<void> {
  const packs = filterPackages(scope, ignore);
  debug("running test cases...");

  for (let i = packs.length - 1; i > 0; i--) {
    const pack = packs[i];
    runTest(pack);
  }

  return Promise.resolve();
}
