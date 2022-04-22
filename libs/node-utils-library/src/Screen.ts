import * as readline from 'readline';

export function cleanScreen(): void {
  readline.moveCursor(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}
