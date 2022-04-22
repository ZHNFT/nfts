import * as readline from 'readline';

export function cleanScreen(): void {
  process.stdout.write('\x1b[0f');
  readline.moveCursor(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}
