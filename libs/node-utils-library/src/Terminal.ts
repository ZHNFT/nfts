import readline from "readline";

export function clearScreen() {
  process.stdout.write("\x1b[0f");
  readline.moveCursor(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}
