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
/// publish package to npm repo
function publish(pack, success, failed) {
    try {
        utils_1.crossExecFileSync("npm", ["publish"], {
            cwd: pack.root,
        });
        success();
    }
    catch (e) {
        failed(e);
    }
}
exports.publish = publish;
/// commit/push modified/added/staged/removed files
function git(pack) {
    try {
        console.log("commiting files");
        utils_1.crossExecFileSync("git", ["add", "."], { cwd: pack.root });
        utils_1.crossExecFileSync("git", ["commit", "-m", `release: release ${pack.main}@${pack.json.version}`], { cwd: pack.root });
    }
    catch (e) { }
}
exports.git = git;
/// Release steps
/// 1. build package
/// 2. update package version
/// 3. sync your local repo to remote service
/// 4. publish package to npm service
async function release(scope, ignore, type) {
    console.log("[@rays/buildhelper] Start release process......");
    console.log("");
    /// build before release
    await build_1.default(scope, ignore).then(async (packs) => {
        await Promise.all(packs.map(async (pack) => {
            utils_1.updateVersion(pack, type);
            publish(pack, () => git(pack), (e) => {
                console.log(e.message);
                utils_1.revertVersion(pack);
            });
        }));
    });
}
exports.default = release;
