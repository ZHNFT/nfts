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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.git = exports.publish = exports.ReleaseTypes = void 0;
const build_1 = __importDefault(require("./build"));
const utils_1 = require("./utils");
process.env.NODE_ENV = "release";
var ReleaseTypes;
(function (ReleaseTypes) {
    ReleaseTypes[ReleaseTypes["major"] = 0] = "major";
    ReleaseTypes[ReleaseTypes["minor"] = 1] = "minor";
    ReleaseTypes[ReleaseTypes["patch"] = 2] = "patch";
})(ReleaseTypes = exports.ReleaseTypes || (exports.ReleaseTypes = {}));
const debug = utils_1.log("release");
/// publish package to npm repo
function publish(pack) {
    return new Promise((resolve, reject) => {
        try {
            /// 虽然使用pnpm做包管理，但是我们还是选择使用npm指令来发布包。
            utils_1.crossExecFileSync("pnpm", ["publish"], {
                cwd: pack.root,
            });
            resolve();
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.publish = publish;
/// commit/push modified/added/staged/removed files
function git(pack, version) {
    return new Promise((resolve, reject) => {
        try {
            utils_1.crossExecFileSync("git", ["add", "."], { cwd: pack.root });
            utils_1.crossExecFileSync("git", ["commit", "-m", `release: release ${pack.main}@${version}`], { cwd: pack.root });
            resolve();
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.git = git;
/// Release steps
/// 1. build package
/// 2. update package version
/// 3. sync your local repo to remote service
/// 4. publish package to npm service
function release(scope, ignore, type) {
    return __awaiter(this, void 0, void 0, function* () {
        debug("Start release process...");
        yield build_1.default(scope, ignore).then((packs) => { var packs_1, packs_1_1; return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            try {
                /// Release the kraken!!!!!!!!!!!!!
                for (packs_1 = __asyncValues(packs); packs_1_1 = yield packs_1.next(), !packs_1_1.done;) {
                    const pack = packs_1_1.value;
                    debug(`publish ${pack.main}...`);
                    try {
                        const releasePackageJson = utils_1.updateVersion(pack, type);
                        yield git(pack, releasePackageJson.version);
                        yield publish(pack);
                        debug(`publish ${pack.main}@${releasePackageJson.version} successfully ✨`);
                    }
                    catch (e) {
                        utils_1.revertVersion(pack);
                        console.log(e);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (packs_1_1 && !packs_1_1.done && (_a = packs_1.return)) yield _a.call(packs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }); });
    });
}
exports.default = release;
