import { Package } from "./packages";
export declare function help(): void;
export default function build(scope: string[], ignore: string[]): Promise<Package[]>;
