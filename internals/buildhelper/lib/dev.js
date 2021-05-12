"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packages_1 = require("./packages");
function development(scope, ignore) {
    const packs = packages_1.filterPackages(scope, ignore);
    if (!packs || !packs.length) {
        console.error("no package found in workspaces");
        process.exit(2);
    }
    console.log(`[@rays/toolkit] building...`);
    console.log("");
    return Promise.all(packs.map((pack) => {
        const rollupWatcher = packages_1.rollupWatch(packages_1.configFor(pack, true));
        rollupWatcher.on("event", (e) => {
            if (e.code === "START") {
                console.log("Starting rollup watcher process....");
            }
            if (e.code === "BUNDLE_END") {
                e.result.close();
                console.log("Bundle end");
            }
            if (e.code === "ERROR") {
                console.log(e.error);
                rollupWatcher.close();
            }
        });
    }));
}
exports.default = development;
