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
const snowpack_1 = require("snowpack");
const packages_1 = require("./packages");
function preview(scope) {
    return __awaiter(this, void 0, void 0, function* () {
        const packages = packages_1.filterPackages(scope, []);
        const pack = packages[0];
        if (!pack.demo.root) {
            return;
        }
        const config = snowpack_1.createConfiguration({
            root: pack.demo.root,
            mount: {
                ".": { url: "/" },
                "../dist": { url: "/dist" },
            },
            devOptions: {
                open: "chrome",
                hostname: "localhost",
                /// hrm + plugin-react-referesh
                hmr: true,
                hmrErrorOverlay: true,
            },
            plugins: [
                /// fast referesh
                ["@snowpack/plugin-react-refresh", { babel: false }],
            ],
        });
        /// FIXME do nothing
        yield snowpack_1.startServer({
            config,
        });
        return Promise.resolve();
    });
}
exports.default = preview;
