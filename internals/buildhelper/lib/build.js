"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packages_1 = require("./packages");
function build(scope, ignore) {
    const packs = packages_1.filterPackages(scope, ignore);
    if (!packs || !packs.length) {
        console.error("no package found in workspaces");
        process.exit(2);
    }
    console.log(`[@rays/toolkit] building...`);
    console.log("");
    return Promise.all(packs.map((pack) => packages_1.rollupBundle(packages_1.configFor(pack, false)).then(async (bundle) => {
        await packages_1.emit(bundle, packages_1.cjs(pack));
        await packages_1.emit(bundle, packages_1.esm(pack));
    })));
}
exports.default = build;
