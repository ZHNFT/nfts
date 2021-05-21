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
exports.help = void 0;
const packages_1 = require("./packages");
const utils_1 = require("./utils");
const debug = utils_1.log("build");
process.env.NODE_ENV = "production";
function help() {
    console.log("Usage: ");
    console.log("  toolkit dev [--scope=[packageName[]]]");
    console.log("For monorepos");
    console.log("    Example: toolkit dev --scope=package1,package2");
    console.log("             toolkit dev --ignore=package1,package2");
    console.log("For Single repo");
    console.log("    Example: toolkit dev <for single repo will ignore the command options>");
}
exports.help = help;
/// TODO
/// This function should return not only Package,
/// also errors happend during build process,
/// so we can print error after build end.
function build(scope, ignore) {
    return __awaiter(this, void 0, void 0, function* () {
        const packs = packages_1.filterPackages(scope, ignore);
        if (!packs || !packs.length) {
            debug(`No package found in workspace\n  --scope=${scope.toString()}\n  --ignore=${ignore.toString()}`);
            process.exit(2);
        }
        debug("building...");
        yield Promise.all(packs.map((pack) => __awaiter(this, void 0, void 0, function* () {
            return packages_1.rollupBundle(packages_1.configFor(pack, false)).then((bundle) => __awaiter(this, void 0, void 0, function* () {
                yield packages_1.emit(bundle, packages_1.cjs(pack));
                yield packages_1.emit(bundle, packages_1.esm(pack));
            }));
        })))
            .then(() => {
            debug("build finished " + packs.map((pack) => pack.main).join(", "));
        })
            .catch((e) => {
            console.log(e);
        });
        return Promise.resolve(packs);
    });
}
exports.default = build;
