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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const packages_1 = require("./packages");
const utils_1 = require("./utils");
process.env.NODE_ENV = "development";
const debug = utils_1.log("dev");
let firstRun = true;
/// Build steps
/// 1. find packages with CLI arguments in workspace
/// 2. start watching process
function development(scope, ignore) {
    return __awaiter(this, void 0, void 0, function* () {
        utils_1.clearScreen();
        const packs = packages_1.filterPackages(scope, ignore);
        for (let i = packs.length - 1; i >= 0; i--) {
            const pack = packs[i];
            const config = packages_1.configFor(pack, true);
            config.output = [packages_1.esm(pack), packages_1.cjs(pack)];
            const rollupWatcher = packages_1.rollupWatch(config);
            rollupWatcher.on("event", (e) => {
                if (e.code === "START") {
                    debug(firstRun
                        ? "Starting rollup watching process...."
                        : "Restarting rollup watching process....");
                    firstRun = false;
                }
                if (e.code === "BUNDLE_END") {
                    console.log(chalk_1.default.cyan(e.input), "-->", chalk_1.default.cyan(chalk_1.default.bold(e.output.join(", "))));
                    console.log("");
                }
                if (e.code === "ERROR") {
                    console.log(e.error);
                }
            });
        }
        return Promise.resolve(packs);
    });
}
exports.default = development;
