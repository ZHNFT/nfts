// screen
import { Interface } from "./readline";

export function render(text: string, rl: Interface) {
  rl.write(text);
}
