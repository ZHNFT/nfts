import { createInterface, destoryInterface } from "./readline";
import * as terminal from "./terminal";
import { Option } from "./config";

type VoidFunctionWithOneArgument<T> = (val: T) => void;

type PromptModule<T> = (
  option: Option,
  done: VoidFunctionWithOneArgument<T>,
) => string;

export function createPrompt<T>(module: PromptModule<T>) {
  return function prompt(option: Option): Promise<T> {
    createInterface();
    return new Promise((resolve) => {
      function done(value) {
        destoryInterface();
        resolve(value);
      }

      terminal.draw(module(option, done));
    });
  };
}
