"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GmfCommandLine_1 = require("./cli/GmfCommandLine");
new GmfCommandLine_1.GmfCommandLine()
    .prepare()
    .exec()
    .then(() => {
    console.log('------------------------------------------------');
})
    .catch(e => {
    console.log(e);
});
