import { getCurrentConfig, cleanup } from "../config";
import {
  watchingKeyPress,
  unwatcingKeyPress,
  Interface,
  Key,
  getCurrentInterface,
} from "../readline";

type KeyPressCallback = (key: Key, rl: Interface) => void;

export default function useKeypress(handler: KeyPressCallback): void {
  const config = getCurrentConfig();
  const rl = getCurrentInterface();
  const idx = config.index;
  const preHander = config.hooks[idx];
  if (preHander !== handler) {
    cleanup(idx);
  }

  watchingKeyPress((_buf: Buffer, key: Key) => {
    handler(key, rl);
  });

  config.hooks[idx] = handler;
  config.hooksCleanup[idx] = () => unwatcingKeyPress();

  config.index++;
}
