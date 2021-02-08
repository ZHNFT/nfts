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
  onStateChange: unknown;
};

const validator = () => true;
const filter = <T>(val: T) => val;
// default transformer

let WorkingConfig: Option | null = null;

export function initHooks(): void {
  const { hooksCleanup } = WorkingConfig;
  let len = hooksCleanup.length;

  while (len--) {
    const cleanup = hooksCleanup[len];
    if (typeof cleanup === "function") {
      cleanup();
    }
  }

  WorkingConfig.index = 0;
  WorkingConfig.hooks = [];
  WorkingConfig.hooksCleanup = [];
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

export function getCurrentConfig(): Option {
  return WorkingConfig;
}

export function bindEventToConfig({ onStateChange }): void {
  WorkingConfig.onStateChange = onStateChange;
}
