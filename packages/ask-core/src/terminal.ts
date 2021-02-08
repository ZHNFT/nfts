import { write as readlineWrite, clean as readlineClean } from "./readline";

export function draw(content: string): void {
  readlineWrite(content);
}

export function clean(): void {
  readlineClean();
}
