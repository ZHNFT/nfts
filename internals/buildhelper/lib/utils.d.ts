/// <reference types="node" />
import { ExecFileSyncOptions } from "child_process";
import { Package, PackageJson } from "./packages";
import { ReleaseTypes } from "./release";
export declare const isUsingPnpm: boolean;
export declare const isUsingNpm: boolean;
export declare const isUsingYarn: boolean;
export declare function hasMoreThanOnePackageLock(): boolean;
export declare function crossExecFileSync(command: string, options?: ReadonlyArray<string>, config?: ExecFileSyncOptions): string | Buffer;
export declare function revertVersion(pack: Package): void;
export declare function updateVersion(pack: Package, type?: keyof typeof ReleaseTypes): PackageJson;
export declare function clearScreen(): void;
declare type LogLevel = "info" | "warn" | "error" | "fatal";
export declare function log(module: string): (message: string, level?: LogLevel) => void;
export {};
