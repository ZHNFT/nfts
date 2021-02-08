import { createInterface, destoryInterface, clean } from "./readline";
import * as terminal from "./terminal";
import {
  bindEventToConfig,
  getPromptConfig,
  Option,
  getCurrentConfig,
  restoreHook,
} from "./config";

type VoidFunctionWithOneArgument<T> = (val: T) => void;

type PromptModule<T> = (
  option: Option,
  done: VoidFunctionWithOneArgument<T>,
) => string;

export function createPrompt<T>(module: PromptModule<T>) {
  return function prompt(option: Option): Promise<T> {
    createInterface();
    getPromptConfig(option);

    return new Promise((resolve) => {
      function done(value: T) {
        restoreHook();
        destoryInterface();
        resolve(value);
      }

      function work(config: Option) {
        console.log("working");
        restoreHook();
        terminal.draw(module(config, done));
      }

      bindEventToConfig({
        onStateChange() {
          work(getCurrentConfig());
        },
      });

      getCurrentConfig(work);
    });
  };
}

export { default as useEffect } from "./hooks/useEffect";
export { default as useState } from "./hooks/useState";
export { default as useKeypress } from "./hooks/useKeypress";
