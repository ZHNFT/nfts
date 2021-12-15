"use strict";
exports.__esModule = true;
exports.CommandTool = void 0;
var CommandTool = /** @class */ (function () {
    function CommandTool() {
        var _this = this;
        this.addCommand = function (commandName, command) { return _this.commands.set(commandName, command); };
        this.getCommand = function (name) {
            return _this.commands.get(name);
        };
        this.commands = new Map();
    }
    return CommandTool;
}());
exports.CommandTool = CommandTool;
