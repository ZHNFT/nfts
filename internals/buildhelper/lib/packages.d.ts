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
    dirs: readonly string[];
    tests: readonly string[];
    json: PackageJson;
    constructor(main: string);
    get(main: string): Package | undefined;
}
export declare function filterPackages(scope: string[], ignore: string[]): Package[];
