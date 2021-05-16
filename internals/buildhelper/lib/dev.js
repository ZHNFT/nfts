"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const packages_1 = require("./packages");
process.env.NODE_ENV = "development";
/// Build steps
/// 1. find packages with CLI arguments in workspace
/// 2. start watching process
function development(scope, ignore) {
    return __awaiter(this, void 0, void 0, function* () {
        const packs = packages_1.filterPackages(scope, ignore);
        // if (!packs || !packs.length) {
        //   console.error("no package found in workspaces");
        //   process.exit(2);
        // }
        console.log("");
        console.log("[@rays/buildhelper] Starting development process");
        packs.forEach((pack) => {
            const config = packages_1.configFor(pack, true);
            config.output = [packages_1.esm(pack), packages_1.cjs(pack)];
            const rollupWatcher = packages_1.rollupWatch(config);
            rollupWatcher.on("event", (e) => {
                if (e.code === "START") {
                    console.log("Starting rollup watcher process....");
                }
                if (e.code === "BUNDLE_END") {
                    console.log(e.input, "-->", e.output.join(","));
                    console.log("");
                }
                if (e.code === "ERROR") {
                    console.log(e.error);
                }
            });
        });
        return Promise.resolve(packs);
    });
}
exports.default = development;
