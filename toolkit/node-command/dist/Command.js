"use strict";
exports.__esModule = true;
exports.Command = void 0;
var Command = /** @class */ (function () {
    function Command() {
    }
    Command.prototype.getAction = function (actionName) {
        return this.commandActions.get(actionName);
    };
    Command.prototype.addAction = function (name, action) {
        this.commandActions.set(name, action);
    };
    return Command;
}());
exports.Command = Command;
