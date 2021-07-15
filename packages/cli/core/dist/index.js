import fsExtra from 'fs-extra';
import { EventEmitter } from 'events';
import path from 'path';
import { readdirSync, statSync } from 'fs';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 *  @class Package
 *  @description 一个实例代表一个package的所有相关数据
 */
const { readJSONSync: readJSONSync$1 } = fsExtra;
class Package {
    constructor(root = process.cwd()) {
        this.root = root;
        this.json = readJSONSync$1(path.resolve(root, "package.json"));
        this.dirs = readdirSync(root).filter((dir) => statSync(dir).isDirectory());
    }
}

class Command extends EventEmitter {
    constructor({ name, version, options, }) {
        super();
        this.logs = [];
        this.name = name;
        this.version = version;
        this.options = options;
        this.commandPackage = new Package(process.cwd());
    }
    run(execute) {
        return __awaiter(this, void 0, void 0, function* () {
            yield execute.apply(null, [this]);
        });
    }
    log(message, level) {
        this.logs.push({
            time: new Date().toLocaleTimeString(),
            message,
            level,
        });
        console.log(message);
    }
}

/**
 *  @description build phases
 * */
var BuildPhase;
(function (BuildPhase) {
    BuildPhase["finished"] = "FINISHED";
})(BuildPhase || (BuildPhase = {}));
var BuildEvent;
(function (BuildEvent) {
    BuildEvent["log"] = "LOG";
})(BuildEvent || (BuildEvent = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["FATAL"] = "FATAL";
})(LogLevel || (LogLevel = {}));

const nodeModules = path.resolve(process.cwd(), "node_modules");
const safeImport = (modulePath) => {
    return new Promise((resolve, reject) => {
        import(path.resolve(nodeModules, modulePath, "dist/index.js"))
            .then((func) => {
            resolve(func);
        })
            .catch((e) => reject(e));
    });
};

class Plugin extends EventEmitter {
    constructor({ name, version, methods, }) {
        super();
        this.name = name;
        this.version = version;
        this.methods = methods;
    }
    /**
     * Plugin的执行方法
     * */
    run(api, cmd, options) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            console.info(`Running plugin ${this.name}@${this.version}....`);
            // cmd.emit(BuildEvent.log, {
            //   time: new Date().toLocaleTimeString(),
            //   level: LogLevel.INFO,
            //   text: `Running plugin ${this.name}@${this.version}....`,
            // });
            yield this.methods.default(api);
        });
    }
}

const { readJSONSync } = fsExtra;
const execRoot = process.cwd(); /// 当前执行路径
const readJsonFile = (file) => readJSONSync(file, { throws: false });
const rootPackageJson = readJsonFile(`${execRoot}/package.json`);
const { dependencies, devDependencies, peerDependencies } = rootPackageJson;
const deps = Object.assign(Object.assign(Object.assign({}, (dependencies !== null && dependencies !== void 0 ? dependencies : {})), (devDependencies !== null && devDependencies !== void 0 ? devDependencies : {})), (peerDependencies !== null && peerDependencies !== void 0 ? peerDependencies : {}));
var index = ({ command, options }) => __awaiter(void 0, void 0, void 0, function* () {
    /// find command package
    const cmdPackage = Object.keys(deps).find((name) => name.endsWith(`-${command}`));
    /// exec command
    const cmd = new Command({
        name: cmdPackage,
        version: deps[cmdPackage],
        options,
    });
    const execute = yield safeImport(cmdPackage);
    // @ts-ignore
    yield cmd.run(execute.default);
    cmd.on(BuildPhase.finished, () => {
        console.log(`${command} build finished`);
        process.exit(0);
    });
});
// export { LogLevel, BuildPhase, BuildEvent } from "./flag";

export default index;
export { Package, Plugin };
