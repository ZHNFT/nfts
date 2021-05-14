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
/// TODO
/// This function should return not only Package,
/// also errors happend during build process,
/// so we can print error after build end.
function build(scope, ignore) {
    return __awaiter(this, void 0, void 0, function* () {
        const packs = packages_1.filterPackages(scope, ignore);
        if (!packs || !packs.length) {
            console.error("no packages found in current workspace with option");
            console.error(`  --scope=${scope.toString()}`);
            console.error(`  --ignore=${ignore.toString()}`);
            process.exit(2);
        }
        console.log(`[@rays/buildhelper] building...`);
        console.log("");
        yield Promise.all(packs.map((pack) => __awaiter(this, void 0, void 0, function* () {
            return packages_1.rollupBundle(packages_1.configFor(pack, false)).then((bundle) => __awaiter(this, void 0, void 0, function* () {
                yield packages_1.emit(bundle, packages_1.cjs(pack));
                yield packages_1.emit(bundle, packages_1.esm(pack));
            }));
        })));
        console.log("");
        console.log("[@rays/buildhelper] all files generated");
        console.log("");
        return Promise.resolve(packs);
    });
}
exports.default = build;
