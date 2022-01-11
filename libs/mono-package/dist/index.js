"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MonoPackages_1 = require("./cli/MonoPackages");
new MonoPackages_1.MonoPackages()
    .prepare()
    .exec()
    .then(function () {
    console.log('aaa');
})
    .catch(function (e) {
    throw e;
});
