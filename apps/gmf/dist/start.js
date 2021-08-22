"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandLineParser_1 = require("./cmd/CommandLineParser");
new CommandLineParser_1.CommandLineParser()
    .prepare()
    .exec()
    .then(() => {
    //
})
    .catch(() => {
    //
});
