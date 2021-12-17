var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ICommandAction {
    constructor({ actionName, actionDescription, actionApplyHook, actionOptions }) {
        this.actionName = actionName;
        this.actionDescription = actionDescription;
        this.actionApplyHook = actionApplyHook;
        this.actionOptions = actionOptions;
        this._apply = this._initAction();
    }
    get apply() {
        return this._apply;
    }
    set apply(_) {
        throw Error(`Can't reset action: ${this.actionName}`);
    }
    /**
     * @description 通过 actionName 来引入action函数逻辑
     */
    _initAction() {
        return __awaiter(this, void 0, void 0, function* () {
            const { actionName } = this;
            return yield import(actionName);
        });
    }
}
export class CommandAction extends ICommandAction {
    constructor({ actionName, actionDescription, actionApplyHook, actionOptions }) {
        super({ actionName, actionDescription, actionApplyHook, actionOptions });
    }
}
