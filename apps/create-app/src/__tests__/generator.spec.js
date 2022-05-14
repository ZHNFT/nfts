"use strict";
exports.__esModule = true;
var Generator_1 = require("../Generator");
describe('Generator test cases', function () {
    test('Generator.getCurrentUsrInfo()', function () {
        expect(function () {
            var user = Generator_1.Generator.getCurrentUserInfo();
            console.log(user);
        }).not.toThrow();
    });
});
