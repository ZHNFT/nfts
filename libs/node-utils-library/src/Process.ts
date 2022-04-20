import * as process from 'process';

export function crash(code: number): never {
  if (code <= 0) {
    console.warn(`Expect code not 0 to crash`);
  }
  process.exit(code);
}
