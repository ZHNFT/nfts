"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandLineTool_1 = require("../src/CommandLineTool");
describe('command line tool public methods test', () => {
    const cmd = new CommandLineTool_1.default({
        name: 'testing',
        description: 'testing CLT'
    });
    it('should return the correct parsed arguments object', () => {
        const args = [
            'commandName1',
            'commandName2',
            '--arg1',
            '--arg2',
            'value2',
            '-arg3',
            'value3',
            'value3-3',
            '-arg4',
            '-arg5',
            'value5',
            'value6',
            'value7'
        ];
        const opts = cmd._parser(args);
        expect(opts._.length).toBe(5);
        expect(opts.arg1).toBe(true);
        expect(opts.arg2).toBe('value2');
        expect(opts.arg3).toBe('value3');
        expect(opts.arg4).toBe(true);
        expect(opts.arg5).toBe('value5');
    });
});
