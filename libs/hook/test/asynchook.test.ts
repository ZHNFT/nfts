import { AsyncHook } from "../src";

jest.setTimeout(10000);

describe("AsyncHook 测试", function () {
  //  静态方法测试
  test("AsyncHook ", () => {
    const fn = jest.fn();
    const ahook = new AsyncHook<{ name: string; age: number }>();

    ahook.add(
      "1",
      () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            fn();
            resolve();
          }, 3000);
        })
    );

    ahook.add(
      "2",
      () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            fn();
            resolve();
          }, 2000);
        })
    );

    ahook.add(
      "3",
      () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            fn();
            resolve();
          }, 1000);
        })
    );

    return expect(ahook.call({ name: "ray", age: 12 }))
      .resolves.toBe(undefined)
      .then(() => {
        expect(fn).toBeCalledTimes(3);
      });
  });
});
