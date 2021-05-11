import { existsSync } from "fs";
import { resolve } from "path";

const cwd = process.cwd();

export const isUsingPnpm = existsSync(resolve(cwd, "pnpm-lock.yaml"));
export const isUsingNpm = existsSync(resolve(cwd, "package-lock.json"));
export const isUsingYarn = existsSync(resolve(cwd, "yarn.lock"));
