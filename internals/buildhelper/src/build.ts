import {
  filterPackages,
  rollupBundle,
  esm,
  cjs,
  emit,
  configFor,
  Package,
} from "./packages";

export default async function build(
  scope: string[],
  ignore: string[]
): Promise<Package[]> {
  const packs = filterPackages(scope, ignore);

  if (!packs || !packs.length) {
    console.error("no package found in workspaces");
    process.exit(2);
  }

  console.log(`[@rays/toolkit] building...`);
  console.log("");

  packs.forEach((pack) =>
    rollupBundle(configFor(pack, false)).then(async (bundle) => {
      await emit(bundle, cjs(pack));
      await emit(bundle, esm(pack));
    })
  );

  return Promise.resolve(packs);
}
