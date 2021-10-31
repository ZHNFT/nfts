"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __importDefault(require("../src"));
describe('test args fucntion', function () {
    test('test with no args', function () {
        var parsedArgs = (0, src_1.default)([
            'command',
            '-a',
            'b',
            '--c',
            'c',
            '--d',
            '-e',
            'f'
        ]);
        expect(parsedArgs._).toEqual('command');
        expect(parsedArgs.a).toEqual('b');
        expect(parsedArgs.c).toEqual('c');
        expect(parsedArgs.d).toEqual(true);
        expect(parsedArgs.e).toEqual('f');
    });
    test('test with error args', function () {
        var parsedArgs = (0, src_1.default)([
            'commandName',
            '--clean',
            '--dist',
            './build',
            '---runDry'
        ]);
        console.log(parsedArgs);
        expect(parsedArgs._).toEqual('commandName');
        expect(parsedArgs.clean).toEqual(true);
        expect(parsedArgs.runDry).toBeUndefined();
    });
});
