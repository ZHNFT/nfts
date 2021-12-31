"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MonoPackages_1 = require("./cli/MonoPackages");
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
new MonoPackages_1.MonoPackages()
    .prepare()
    .exec()
    .then(function () {
    console.log('aaa');
})
    .catch(function (e) {
    throw e;
});
