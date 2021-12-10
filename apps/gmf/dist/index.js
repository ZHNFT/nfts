"use strict";
exports.__esModule = true;
var Superior_1 = require("./commands/Superior");
new Superior_1.Superior()
    .prepare()
    .execute()
    .then(function () {
    console.log('finished');
})["catch"](function (e) {
    console.error('error', e);
});
