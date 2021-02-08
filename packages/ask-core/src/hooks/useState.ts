import { getCurrentConfig } from "../config";

type StateHandler<T> = (newValue: T) => void;

export default function useState<T>(initialState: T): [T, StateHandler<T>] {
  const config = getCurrentConfig();

  if (!config) {
    throw new Error(
      "Working process should have a valid config, internal error, please file a issues",
    );
  }

  const { index, hooks } = config;
  const idx = index;
  const value = idx in hooks ? (hooks[idx] as T) : initialState;

  config.index++;
  return [
    value,
    (newValue: T) => {
      config.hooks[idx] = newValue;
      config.onStateChange();
    },
  ];
}
