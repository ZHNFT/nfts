import { performance } from 'perf_hooks';
import * as console from 'console';

export function now() {
  return performance.now();
}

enum Unit {
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

export function taskSync(mark: string, task: () => void, writer = console.info) {
  const _start = now();
  try {
    task();
    writer(`${mark} -> ${millisecondsFormat(now() - _start)}`);
    console.log('');
  } catch (e) {
    throw e;
  }
}

export function taskAsync(
  mark: string,
  task: () => Promise<void>,
  writer = console.info
): Promise<void> {
  const _start = now();
  return task().finally(() => {
    writer(`${mark} -> ${millisecondsFormat(now() - _start)}`);
    console.log('');
  });
}
