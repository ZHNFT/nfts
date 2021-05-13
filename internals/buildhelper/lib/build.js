"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packages_1 = require("./packages");
/// TODO
/// This function should return not only Package,
/// also errors happend during build process,
/// so we can print error after build end.
async function build(scope, ignore) {
    const packs = packages_1.filterPackages(scope, ignore);
    if (!packs || !packs.length) {
        console.error("no packages found in current workspace with option");
        console.error(`  --scope=${scope.toString()}`);
        console.error(`  --ignore=${ignore.toString()}`);
        process.exit(2);
    }
    console.log(`[@rays/buildhelper] building...`);
    console.log("");
    await Promise.all(packs.map(async (pack) => packages_1.rollupBundle(packages_1.configFor(pack, false)).then(async (bundle) => {
        await packages_1.emit(bundle, packages_1.cjs(pack));
        await packages_1.emit(bundle, packages_1.esm(pack));
    })));
    console.log("");
    console.log("[@rays/buildhelper] all files generated");
    console.log("");
    return Promise.resolve(packs);
}
exports.default = build;
