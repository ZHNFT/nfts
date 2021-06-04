"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
/// setup new project
const fs_1 = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const minimist_1 = __importDefault(require("minimist"));
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
const debug = utils_1.log("creation");
function exists(path) {
    return fs_1.default.existsSync(path);
}
function help() {
    console.log("Usage: ");
    console.log("  toolkit create [projectName]");
}
function create(scope, ignore) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((scope === null || scope === void 0 ? void 0 : scope.length) || (ignore === null || ignore === void 0 ? void 0 : ignore.length)) {
            debug(chalk_1.default.yellowBright("scope and ignore will be ignored when creation"));
        }
        const { _ } = minimist_1.default(process.argv.slice(2));
        let [, projectName] = _;
        let absoluteProjectPath = projectName;
        if (!projectName) {
            debug(`invalid project name ${projectName}`, "fatal");
            help();
        }
        if (path_1.default.isAbsolute(projectName)) {
            projectName = path_1.default.dirname(projectName);
            absoluteProjectPath = projectName;
        }
        if (exists(absoluteProjectPath)) {
            debug(`project path is already exists, ${chalk_1.default.yellowBright(absoluteProjectPath)}`, "fatal");
        }
        else {
            yield fs_1.promises.mkdir(path_1.default.resolve(absoluteProjectPath));
        }
        yield fs_1.promises.mkdir(path_1.default.resolve(absoluteProjectPath, "src"));
        yield fs_1.promises.mkdir(path_1.default.resolve(absoluteProjectPath, "tests"));
        yield fs_1.promises.writeFile(path_1.default.resolve(absoluteProjectPath, "package.json"), JSON.stringify({
            name: `@initializer/${projectName.split("/").slice(-1).toString()}`,
            version: "0.0.0",
            description: "",
            main: "src/index.ts",
            exports: {
                node: "./dist/index.cjs",
                default: "./dist/index.js",
            },
            scripts: {
                start: "toolkit preview",
                build: "toolkit build",
            },
            keywords: [projectName],
            typings: "./dist/index.d.ts",
            devDependencies: {
                "@initializer/buildhelper": "workspace:*",
                "@initializer/eslint-config": "workspace:*",
            },
            eslintConfig: {
                extends: "@initializer/eslint-config",
                ignorePatterns: ["temp/*", "dist/*"],
            },
        }, null, 2));
        yield fs_1.promises.writeFile(path_1.default.resolve(absoluteProjectPath, "README.md"), [
            `# @initializer/${projectName.split("/").slice(-1).toString()}`,
            "---",
            `## ${projectName}`, //
        ].join("\n"));
        yield fs_1.promises.writeFile(path_1.default.resolve(absoluteProjectPath, "tsconfig.json"), JSON.stringify({
            extends: "../../tsconfig.json",
            compilerOptions: {
                outDir: "./lib",
                declaration: true,
                declarationDir: "./temp",
            },
        }, null, 2));
        process.chdir(absoluteProjectPath);
        child_process_1.spawnSync("pnpm", ["install"], {
            stdio: "inherit",
            shell: process.platform === "win32",
        });
        debug("creation finished", "info");
        return Promise.resolve();
    });
}
exports.default = create;
