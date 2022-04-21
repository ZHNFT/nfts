import { performance } from 'perf_hooks';
import * as os from 'os';

export function now() {
  return performance.now();
}

export enum Unit {
  S,
  M,
  H
}

export function millisecondsFormat(milliseconds, unit = Unit.S): string {
  switch (unit) {
    case Unit.S:
      return (milliseconds / 1000).toFixed(2) + 's';
    case Unit.M:
      return (milliseconds / 1000 / 60).toFixed(1) + 'm';
    case Unit.H:
      return (milliseconds / 1000 / 60 / 60).toFixed(1) + 'h';
  }
}

// eslint-disable-next-line @typescript-eslint/unbound-method
export function taskSync(mark: string, task: () => void, writer = console.info) {
  const _start = now();
  task();
  writer(`${mark} -> ${millisecondsFormat(now() - _start)}${os.EOL}`);
  console.log('');
}

export function taskAsync(
  mark: string,
  task: () => Promise<void>,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  writer = console.info
): Promise<void> {
  const _start = now();
  return task().finally(() => {
    writer(`${mark} -> ${millisecondsFormat(now() - _start)}${os.EOL}`);
    console.log('');
  });
}
