"use strict";
/**
 * @description demo plugin
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ctx, options) => {
    console.log('Add plugin hook', options);
    ctx.hooks.build.tap('demo-plugin', args => {
        console.log('Execute plugin hook', args);
    });
};
//# sourceMappingURL=demo.plugin.js.map