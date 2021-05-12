import {
  filterPackages,
  rollupBundle,
  esm,
  cjs,
  emit,
  configFor,
} from "./packages";

export default function build(
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
    packs.map((pack) =>
      rollupBundle(configFor(pack, false)).then(async (bundle) => {
        await emit(bundle, cjs(pack));
        await emit(bundle, esm(pack));
      })
    )
  )
}
