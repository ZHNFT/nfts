import {
  filterPackages,
  rollupBundle,
  esm,
  cjs,
  emit,
  configFor,
  Package,
} from "./packages";
import { clearScreen, log } from "./utils";

const debug = log("build");

process.env.NODE_ENV = "production";

export function help(): void {
  console.log("Usage: ");
  console.log("  toolkit dev [--scope=[packageName[]]]");
  console.log("For monorepo");
  console.log("    Example: toolkit dev --scope=package1,package2");
  console.log("             toolkit dev --ignore=package1,package2");
  console.log("For Single repo");
  console.log(
    "    Example: toolkit dev <for single repo will ignore the command options>"
  );
}

/// TODO
/// This function should return not only Package,
/// also errors happend during build process,
/// so we can print error after build end.
export default async function build(
  scope: string[],
  ignore: string[]
): Promise<Package[]> {
  clearScreen();
  const packs = filterPackages(scope, ignore);

  if (!packs || !packs.length) {
    debug(
      `No package found in workspace\n  --scope=${scope.toString()}\n  --ignore=${ignore.toString()}`
    );
    process.exit(2);
  }

  debug("building...");

  await Promise.all(
    packs.map(async (pack) =>
      rollupBundle(configFor(pack, false)).then(async (bundle) => {
        await emit(bundle, cjs(pack));
        await emit(bundle, esm(pack));
      })
    )
  )
    .then(() => {
      debug("build finished " + packs.map((pack) => pack.main).join(", "));
    })
    .catch((e) => {
      console.log(e);
    });

  return Promise.resolve(packs);
}
