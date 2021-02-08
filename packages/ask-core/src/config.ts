// type StateChange = () => void;

export type Option = {
  type: string;
  message: string;
  validator?: () => boolean;
  filter?: <T>(val: T) => T;
  transformer?: <P>(val: unknown) => P;
  // Hooks
  hooks?: unknown[];
  hooksCleanup?: unknown[];
  index?: number;
  // Event Handler
  onStateChange: VoidFunction;
  keyPress: VoidFunction;
};

const validator = () => true;
const filter = <T>(val: T) => val;
// default transformer

let WorkingConfig: Option | null = null;

export function initHooks(): void {
  const { hooksCleanup } = WorkingConfig;
  if (hooksCleanup && hooksCleanup.length) {
    let len = hooksCleanup.length;
    while (len--) {
      const cleanUp = hooksCleanup[len];
      if (typeof cleanUp === "function") {
        console.log("cleaning");
        cleanUp();
      }
    }
  }

  WorkingConfig.index = 0;
  WorkingConfig.hooks = [];
  WorkingConfig.hooksCleanup = [];
}

export function restoreHook(): void {
  initHooks();
}

export function getPromptConfig(config: Option): Option {
  WorkingConfig = {
    filter,
    validator,
    ...config,
  };

  initHooks();

  return WorkingConfig;
}

export function getCurrentConfig(cb?: (c: Option) => void): Option {
  if (cb) {
    cb(WorkingConfig);
  }
  return WorkingConfig;
}

type Events = {
  onStateChange: VoidFunction;
};

export function bindEventToConfig({ onStateChange }: Events): void {
  WorkingConfig.onStateChange = onStateChange;
}

export function cleanup(idx: number): void {
  const { hooksCleanup } = WorkingConfig;
  const cleanupHook = hooksCleanup[idx];

  if (typeof cleanupHook === "function") {
    cleanupHook();
    hooksCleanup[idx] = null;
  }
}
