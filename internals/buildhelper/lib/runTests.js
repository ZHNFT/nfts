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
const jest_1 = require("jest");
// import { resolve } from "path";
const packages_1 = require("./packages");
process.env.NODE_ENV = "test";
function runTest(pack) {
    jest_1.run([
        "--debug",
        "--colors",
        "--passWithNoTests",
        // "--runTestsByPath", resolve(pack.root, "tests"),
        // "--testPathPattern", "<rootDir>/tests/*"
    ], pack.root).catch((e) => console.log(e));
}
function runTests(scope, ignore) {
    return __awaiter(this, void 0, void 0, function* () {
        const packs = packages_1.filterPackages(scope, ignore);
        ///
        console.log("testing......");
        for (let i = packs.length - 1; i > 0; i--) {
            const pack = packs[i];
            runTest(pack);
        }
        return Promise.resolve();
    });
}
exports.default = runTests;
