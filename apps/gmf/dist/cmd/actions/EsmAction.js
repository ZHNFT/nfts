"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsmAction = void 0;
const GmfAction_1 = require("../base/GmfAction");
class EsmAction extends GmfAction_1.GmfAction {
    constructor() {
        super({
            name: 'esm',
            description: 'Startup esm build process'
        });
    }
}
exports.EsmAction = EsmAction;
