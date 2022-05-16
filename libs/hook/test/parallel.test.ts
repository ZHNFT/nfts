import { ParallelHook } from "../src/hooks/ParallelHook";

const randomSleepFn = (cb: () => void) => {
  const randomInterval = Math.random() * 5000;

  return new Promise<void>((resolve) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(cb());
    }, randomInterval);
  });
};

describe("parallel测试用例", () => {
  const hook = new ParallelHook();

  const result: string[] = [];

  test("无序执行Hook", () => {
    hook.add("1", () => {
      randomSleepFn(() => {
        result.push("1");
      });
    });

    hook.add("2", () => {
      randomSleepFn(() => {
        result.push("2");
      });
    });

    hook.add("4", () => {
      randomSleepFn(() => {
        result.push("4");
      });
    });

    hook.add("6", () => {
      randomSleepFn(() => {
        result.push("6");
      });
    });

    return expect(hook.call()).resolves.not.toThrow();
  });
});
