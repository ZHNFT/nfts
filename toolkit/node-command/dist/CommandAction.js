"use strict";
exports.__esModule = true;
exports.CommandAction = exports.ICommandAction = void 0;
var ICommandAction = /** @class */ (function () {
    function ICommandAction() {
    }
    return ICommandAction;
}());
exports.ICommandAction = ICommandAction;
var CommandAction = /** @class */ (function () {
    function CommandAction(_a) {
        var actionName = _a.actionName, actionDescription = _a.actionDescription;
        this.name = actionName;
        this.description = actionDescription;
        this.hooks = {};
    }
    CommandAction.prototype.applyAction = function (ctx) {
        console.log('apply action');
    };
    return CommandAction;
}());
exports.CommandAction = CommandAction;
