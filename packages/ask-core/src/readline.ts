import * as RL from "readline";

let WorkingInterface: RL.Interface | null = null;

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
  // @fixme Calc the cursor positon
  RL.cursorTo(process.stdout, 0, -1);
  RL.clearScreenDown(process.stdout);
}

export { Interface } from "readline";
