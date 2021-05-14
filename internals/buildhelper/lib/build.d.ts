import { Package } from "./packages";
export default function build(scope: string[], ignore: string[]): Promise<Package[]>;
