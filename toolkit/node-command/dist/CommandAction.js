"use strict";
exports.__esModule = true;
exports.CommandAction = void 0;
var CommandAction = /** @class */ (function () {
    function CommandAction(name, action) {
        this.name = name;
        this.action = action;
    }
    CommandAction.prototype.applyAction = function (ctx) {
        this.action.call(this, ctx);
    };
    return CommandAction;
}());
exports.CommandAction = CommandAction;
