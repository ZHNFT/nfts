import { Package } from "./packages";
export declare enum ReleaseTypes {
    "major" = 0,
    "minor" = 1,
    "patch" = 2
}
export declare function publish(pack: Package): Promise<void>;
export declare function git(pack: Package, version: string): Promise<void>;
export default function release(scope: string[], ignore: string[], type: keyof typeof ReleaseTypes): Promise<void>;
