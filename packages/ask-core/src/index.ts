// Main
import { createRL, Interface, Key } from "./readline";
import * as screen from "./screen";

const hooks: unknown[] = [];
const hooksCleanup: (() => void)[] = [];
let index = 0;
let onChange = () => {
  /**/
};
let globalRL: Interface;

function cleanup(idx: number) {
  const cleanupFn = hooksCleanup[idx];
  if (cleanupFn && typeof cleanupFn === "function") {
    cleanupFn();
  }
}

type Opts = {
  message: string;
  type: string;
  choices: string[];
};
type Done = (val: unknown) => void;
type View = (opts: Opts, done: Done) => string;

export function createPrompt<T>(view: View) {
  return function prompt(option: Opts): Promise<T> {
    return new Promise((resolve) => {
      globalRL = createRL();
      const done = (val: T) => {
        let len = hooksCleanup.length;
        while (len--) {
          cleanup(len);
        }
        index = 0;
        hooks.length = 0;
        hooksCleanup.length = 0;
        resolve(val);
      };
      const workLoop = (opts: Opts) => {
        index = 0;
        onChange = () => workLoop(opts);
        screen.render(view(opts, done), globalRL);
      };
      workLoop(option);
    });
  };
}

export function useState<T>(initialValue: T): [T, (val: T) => void] {
  const idx = index;
  const value = idx in hooks ? (hooks[idx] as T) : initialValue;
  index++;
  return [
    value,
    (newVal: T) => {
      hooks[idx] = newVal;
      onChange();
    },
  ];
}

type Cancel = () => void;
type Callback = (rl: Interface) => Cancel;

export function useEffect(callback: Callback, deps: string[]): void {
  const idx = index;
  let hasChange = false;
  const prevDeps = hooks[idx];
  if (prevDeps) {
    hasChange = deps.some((dep, i) => !Object.is(dep, prevDeps[i]));
  }
  if (hasChange) {
    const cleanupFn = callback(globalRL);
    const prevCleanupFn = hooksCleanup[idx];
    if (prevCleanupFn) {
      cleanup(idx);
    }
    hooksCleanup[idx] = cleanupFn;
  }
  hooks[idx] = deps;
  index++;
}

type KeypressCallback = (event: Key, rl: Interface) => void;

export function useKeypress(callback: KeypressCallback): void {
  const idx = index;
  const cleanupFn = hooksCleanup[idx];
  if (cleanupFn) {
    cleanup(idx);
  }
  const handleKeyPress = (_buf: Buffer, key: Key) => {
    callback(key, globalRL);
  };
  process.stdin.on("keypress", handleKeyPress);
  hooks[idx] = callback;
  hooksCleanup[idx] = () => {
    process.stdin.removeListener("keypress", handleKeyPress);
  };
  index++;
}
