"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
describe('生成模板文件', function () {
    test('测试生成模板', function () {
        expect(function () {
            (0, child_process_1.spawnSync)('node', ['./bin/create-app', 'create', '--ts', '--platform', 'react']);
        }).not.toThrow();
    });
});
