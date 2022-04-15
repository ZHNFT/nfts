import * as process from 'process';

export function crash(code: number): never {
  if (code <= 0) {
    console.warn(`Expect code bidder than 0 to crash`);
  }
  process.exit(code);
}
