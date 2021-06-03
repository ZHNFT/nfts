import * as jest from "jest";
import { log } from "./utils";
import { filterPackages, Package } from "./packages";

process.env.NODE_ENV = "test";

const debug = log("test");

function runTest(pack: Package, options: { [key: string]: string }) {
  jest
    .runCLI(
      {
        $0: "runTests",
        _: [],
        colors: true,
        coverage: true,
        transform: JSON.stringify({
          "^.+\\.tsx?$": "ts-jest",
        }),
        testNamePattern: "<rootDir>/tests?/.*.[jt]sx?$",
        ...options,
      },
      [pack.root]
    )
    .then(() => {
      console.log("test finished");
    })
    .catch((e) => console.log(e));
}

export default async function runTests(
  scope: string[],
  ignore: string[],
  extraOptions: { [key: string]: string }
): Promise<void> {
  const packs = filterPackages(scope, ignore);
  debug("running test cases...");

  for (let i = packs.length - 1; i >= 0; i--) {
    const pack = packs[i];
    runTest(pack, extraOptions);
  }

  return Promise.resolve();
}
