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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Generator = void 0;
var child_process_1 = require("child_process");
var path_1 = require("path");
var promises_1 = require("fs/promises");
var _1 = require(".");
var node_utils_library_1 = require("@nfts/node-utils-library");
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.run = function (opts, cwd) {
        if (cwd === void 0) { cwd = process.cwd(); }
        return __awaiter(this, void 0, void 0, function () {
            var ts, platform, dependencies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 重置所有文件写入的 TASK
                        this.fileEmitTasks = [];
                        ts = opts.ts, platform = opts.platform;
                        dependencies = ['@nfts/gmf', '@nfts/eslint-config'];
                        if (ts) {
                            dependencies.push('typescript');
                        }
                        switch (platform[0]) {
                            case 'node':
                                break;
                            case 'react':
                                dependencies = dependencies.concat(['react', 'react-dom', '@nfts/plugin-webpack']);
                                break;
                            default:
                                break;
                        }
                        this.makePackageJson(this.getCurrentUserInfo(), {
                            platform: opts.platform[0]
                        });
                        this.makeTemplateFiles(cwd);
                        // 开始写入文件
                        return [4 /*yield*/, node_utils_library_1.Execution.parallel(this.fileEmitTasks)];
                    case 1:
                        // 开始写入文件
                        _a.sent();
                        console.log('文件写入结束');
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
     * 获取当前用户的 git user 配置信息
     * */
    Generator.getCurrentUserInfo = function () {
        try {
            var name_1 = (0, child_process_1.spawnSync)('git', ['config', '--global', 'user.name']).stdout.toString();
            var email = (0, child_process_1.spawnSync)('git', ['config', '--global', 'user.email']).stdout.toString();
            return {
                name: name_1.replace('\n', ''),
                email: email.replace('\n', '')
            };
        }
        catch (e) {
            return {
                name: '',
                email: ''
            };
        }
    };
    Generator.installDeps = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    // 生成 package.json 文件
    Generator.makePackageJson = function (userInfo, opts) {
        var _this = this;
        opts = node_utils_library_1.Utilities.object.merge({
            platform: _1.Platforms.node
        }, opts !== null && opts !== void 0 ? opts : {});
        var platformCommand = opts.platform === _1.Platforms.react ? 'bundle' : 'build';
        var pkg = {
            name: 'new_project',
            version: '0.0.1',
            main: './dist/index.js',
            types: './dist/index.d.ts',
            author: {
                name: userInfo.name,
                email: userInfo.email,
                url: ''
            },
            publishConfig: {
                access: 'public'
            },
            scripts: {
                test: "gmf ".concat(platformCommand, " --test"),
                dev: "gmf ".concat(platformCommand, " --watch"),
                build: "gmf ".concat(platformCommand, " --test --clean")
            },
            dependencies: {
                '@nfts/gmf': '@latest',
                '@nfts/eslint-config': '@latest'
            },
            devDependencies: {
                '@types/jest': '~27.5.1',
                '@types/node': '~17.0.5',
                jest: '~27.4.5',
                'ts-jest': '~27.1.2'
            },
            prettier: this.getPrettierConfig()
        };
        this.fileEmitTasks.push(function () { return _this.makeFileTask('package.json', JSON.stringify(pkg)); });
    };
    Generator.getPrettierConfig = function () {
        return {
            printWidth: 120,
            endOfLine: 'auto',
            singleQuote: true,
            trailingComma: 'none',
            arrowParens: 'avoid'
        };
    };
    // 创建模板文件
    Generator.makeTemplateFiles = function (cwd) {
        var _this = this;
        var files = {
            // .eslintrc.js
            '.eslintrc.js': "const { dirname } = require('path');\n      /** @type {import(\"eslint\").Linter.Config} */\n      module.exports = {\n        root: true,\n        extends: ['@nfts'],\n        ignorePatterns: ['*.(test|spec).*', 'node_modules', 'dist', '.yarn'],\n        parserOptions: {\n          tsconfigRootDir: dirname(__filename)\n        }\n      };",
            // .gitignore
            '.gitignore': "# IDEs\n      .idea/\n      .vscode/\n\n      # Build/Release\n      dist/\n      build/\n\n      # Modules\n      node_modules/\n\n      # Lock files\n      yarn.lock\n      pnpm-lock.yaml\n      package-lock.json",
            // .npmignore
            '.npmignore': "*\n\n      !/dist/**\n      !/bin/**\n      !/schemas/**",
            // jest.config.js
            'jest.config.js': "/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */\n      module.exports = {\n        preset: 'ts-jest',\n        testEnvironment: 'node',\n        passWithNoTests: true\n      };",
            'tsconfig.json': ""
        };
        Object.keys(files).forEach(function (fileName) {
            var content = files[fileName];
            _this.fileEmitTasks.push(function () { return _this.makeFileTask((0, path_1.resolve)(cwd, fileName), content); });
        });
    };
    // 创建写文件的 Task
    Generator.makeFileTask = function (filePath, content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, promises_1.writeFile)(filePath, content, {
                            encoding: 'utf-8'
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Generator;
}());
exports.Generator = Generator;
