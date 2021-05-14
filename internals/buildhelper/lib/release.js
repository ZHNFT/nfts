"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.git = exports.publish = exports.ReleaseTypes = void 0;
const build_1 = __importDefault(require("./build"));
const utils_1 = require("./utils");
var ReleaseTypes;
(function (ReleaseTypes) {
    ReleaseTypes[ReleaseTypes["major"] = 0] = "major";
    ReleaseTypes[ReleaseTypes["minor"] = 1] = "minor";
    ReleaseTypes[ReleaseTypes["patch"] = 2] = "patch";
})(ReleaseTypes = exports.ReleaseTypes || (exports.ReleaseTypes = {}));
function publish(pack, success, failed) {
    utils_1.crossExecFileSync("npm", ["publish"], {
        cwd: pack.root,
    });
}
exports.publish = publish;
function git(pack) {
    utils_1.crossExecFileSync("git status", ["status"], {
        cwd: pack.root,
    });
}
exports.git = git;
async function release(scope, ignore, type) {
    console.log("[@rays/buildhelper] Start release process......");
    await build_1.default(scope, ignore).then(async (packs) => {
        packs.forEach(async (pack) => {
            utils_1.updateVersion(pack, type);
            publish(pack, () => {
                git(pack);
            }, (e) => {
                console.error(e);
                utils_1.revertVersion(pack);
            });
        });
    });
}
exports.default = release;
