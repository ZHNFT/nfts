"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const plugin = (api, options) => {
    api.logger.log('执行plugin-ts插件');
    api.hooks.build.tap('plugin-ts', () => __awaiter(void 0, void 0, void 0, function* () {
        api.logger.log('执行plugin-ts钩子函数');
        yield (0, child_process_1.spawn)('tsc', ['--build', '--verbose'], {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    }));
};
exports.default = plugin;
