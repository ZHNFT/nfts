import { run } from "jest";
// import { resolve } from "path";
import { filterPackages, Package } from "./packages";

process.env.NODE_ENV = "test";

function runTest(pack: Package) {
  run(
    [
      "--debug",
      "--colors",
      "--passWithNoTests",
      // "--runTestsByPath", resolve(pack.root, "tests"),
      // "--testPathPattern", "<rootDir>/tests/*"
    ],
    pack.root
  ).catch((e) => console.log(e));
}

export default async function runTests(
  scope: string[],
  ignore: string[]
): Promise<void> {
  const packs = filterPackages(scope, ignore);
  ///
  console.log("testing......");

  for (let i = packs.length - 1; i > 0; i--) {
    const pack = packs[i];
    runTest(pack);
  }

  return Promise.resolve();
}
