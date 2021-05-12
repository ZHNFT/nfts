import { InputOptions, OutputOptions, RollupBuild, RollupOptions, RollupWatcher, RollupWatchOptions } from "rollup";
export interface PackageJson {
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
    peerDependencies: {
        [key: string]: string;
    };
    main: string;
    [key: string]: any;
}
export declare class Package {
    readonly main: string;
    root: string;
    src: string | null;
    dirs: readonly string[];
    tests: readonly string[];
    json: PackageJson;
    constructor(main: string);
    get(main: string): Package | undefined;
}
export declare function filterPackages(scope: string[], ignore: string[]): Package[];
export declare function rollupBundle(option: InputOptions): Promise<RollupBuild>;
export declare function rollupWatch(options: RollupWatchOptions): RollupWatcher;
export declare function esm(pack: Package): OutputOptions;
export declare function cjs(pack: Package): OutputOptions;
export declare function emit(bundle: RollupBuild, output: OutputOptions): Promise<void>;
export declare function configFor(pack: Package, isDev: boolean): RollupOptions;
