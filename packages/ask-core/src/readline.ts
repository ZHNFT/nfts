import * as RL from "readline";

let WorkingInterface: RL.Interface | null = null;

const noop = () => {
  /**/
};

/**
 *
 * @param input
 * @param output
 * @param terminal
 */
export function createInterface(
  input = process.stdin,
  output = process.stdout,
  terminal = true,
): RL.Interface {
  WorkingInterface = RL.createInterface({
    input,
    output,
    terminal,
  });

  return WorkingInterface;
}

export function getCurrentInterface(): RL.Interface {
  return WorkingInterface;
}

export function destoryInterface(): void {
  if (WorkingInterface) {
    WorkingInterface.off("keypress", () => {
      /**/
    });
    WorkingInterface.pause();
    WorkingInterface.close();
    WorkingInterface = null;
  }
}

export function write(message: string): void {
  if (WorkingInterface) {
    WorkingInterface.write(message);
  }
}

export function clean(): void {
  // @fixme Calc the cursor position
  RL.cursorTo(process.stdout, 0, -1);
  RL.clearScreenDown(process.stdout);
}

export function watchingKeyPress(cb: (buf: Buffer, key: RL.Key) => void): void {
  if (WorkingInterface) {
    if (process.stdout.listenerCount("keypress") > 11) {
      throw new Error("Max Listener added");
    }
    RL.emitKeypressEvents(process.stdout);
    process.stdout.on("keypress", cb);
  }
}

export function unwatcingKeyPress(): void {
  if (WorkingInterface) {
    process.stdout.removeListener("keypress", noop);
  }
}

export { Interface, Key } from "readline";
