import { Package } from "./packages";
export declare enum ReleaseTypes {
    "major" = 0,
    "minor" = 1,
    "patch" = 2
}
export declare function publish(pack: Package, success: () => void, failed: (e: Error) => void): void;
export declare function git(pack: Package): void;
export default function release(scope: string[], ignore: string[], type: keyof typeof ReleaseTypes): Promise<void>;
