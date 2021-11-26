"use strict";
exports.__esModule = true;
exports.Command = void 0;
var Command = /** @class */ (function () {
    function Command(_a) {
        var commandName = _a.commandName, commandDescription = _a.commandDescription;
        this.commandName = commandName;
        this.commandDescription = commandDescription;
        this.commandActions = new Map();
    }
    Command.prototype.getAction = function (actionName) {
        return this.commandActions.get(actionName);
    };
    Command.prototype.addAction = function (action) {
        this.commandActions.set(action.name, action);
    };
    return Command;
}());
exports.Command = Command;
