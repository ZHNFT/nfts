import { getCurrentConfig, cleanup } from "../config";

type Deps = unknown[];
type Cleanup = () => void;
type EffectCallback = () => void | Cleanup;

export default function useEffect(cb: EffectCallback, deps: Deps): void {
  const config = getCurrentConfig();
  const idx = config.index;
  const prevDeps = config.hooks[idx];
  let hasChanged = false;

  if (prevDeps) {
    hasChanged = deps.some((dep, i) => !Object.is(dep, prevDeps[i]));
  }

  if (hasChanged) {
    cleanup(idx);
  }

  config.hooks[idx] = deps;
  config.hooksCleanup[idx] = cb();

  config.index++;
}
