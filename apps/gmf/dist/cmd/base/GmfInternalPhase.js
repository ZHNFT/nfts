"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmfInternalPhase = void 0;
const tapable_1 = require("tapable");
class GmfInternalPhase {
    constructor({ gmfConfig, gmfLog, gmfTerminal }) {
        this.actionByName = new Map();
        this.gmfConfig = gmfConfig;
        this.gmfLogger = gmfLog;
        this.gmfTerminal = gmfTerminal;
        this.gmfPluginContext = {
            hooks: {
                esm: new tapable_1.SyncHook(),
                test: new tapable_1.SyncHook(),
                build: new tapable_1.SyncHook(),
                release: new tapable_1.SyncHook()
            },
            addAction: (action) => {
                this.registerAction(action);
            }
        };
    }
    /**
     * @internal
     */
    registerAction(action) {
        this.actions.push(action);
        this.actionByName.set(action.name, action);
    }
    /**
     *
     */
    getActionByName(name) {
        return this.actionByName.get(name);
    }
}
exports.GmfInternalPhase = GmfInternalPhase;
