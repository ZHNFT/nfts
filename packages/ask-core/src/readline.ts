import { createInterface, Interface } from "readline";

export function createRL(): Interface {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });
}

export { Key, Interface } from "readline";
