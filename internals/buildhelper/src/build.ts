process.env.NODE_ENV = "production";

import {
  filterPackages,
  rollupBundle,
  esm,
  cjs,
  emit,
  configFor,
  Package,
} from "./packages";

/// TODO
/// This function should return not only Package,
/// also errors happend during build process,
/// so we can print error after build end.
export default async function build(
  scope: string[],
  ignore: string[]
): Promise<Package[]> {
  const packs = filterPackages(scope, ignore);

  if (!packs || !packs.length) {
    console.log("no packages found in current workspace with option");
    console.log(`  --scope=${scope.toString()}`);
    console.log(`  --ignore=${ignore.toString()}`);
    console.log("");
    process.exit(2);
  }

  console.log(`[@rays/buildhelper] building...`);
  console.log("");

  await Promise.all(
    packs.map(async (pack) =>
      rollupBundle(configFor(pack, false)).then(async (bundle) => {
        await emit(bundle, cjs(pack));
        await emit(bundle, esm(pack));
      })
    )
  );
  console.log("");
  console.log("[@rays/buildhelper] all files generated");
  console.log("");
  return Promise.resolve(packs);
}
