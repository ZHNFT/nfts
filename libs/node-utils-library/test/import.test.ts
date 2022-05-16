import { dirname, resolve } from "path";
import { sync, resolve as requireResolve } from "../src/Reuqire";

describe("导入 .scripts、.eslintrc.js 文件模块", function () {
  it("should import .eslintrc.js correct", function () {
    const add = sync("./module/A.js", { cwd: dirname(__filename) }) as (
      a: number,
      b: number
    ) => number;

    expect(add(1, 2)).toEqual(3);
  });

  it("should import moduleA correct", function () {
    const add = sync("./module/B.ts", { cwd: dirname(__filename) }) as {
      default: (a: number, b: number) => number;
    };

    expect(add.default(1, 2)).toEqual(3);
  });
});

describe("导入JSON文件", () => {
  it("成功导入，并且读取到JSON数据", () => {
    const json = sync("./json/data.json", {
      cwd: resolve(dirname(__dirname), "test"),
    });
    const f = requireResolve("./json/data.json", {
      cwd: resolve(dirname(__dirname), "test"),
    });
    console.log(f);
    expect(json).toEqual({ name: "test-import" });
  });
});

describe("导入 npm 包模块", function () {
  it("导入 @nfts/gmf 模块", function () {
    const t = sync("@nfts/gmf", {
      // cwd: dirname(__filename)
    });

    const f = requireResolve("@nfts/gmf");
    console.log(f);
    expect(t).toBeTruthy();
    expect(f).toBeTruthy();
  });

  test("should throw when import module is not exist", () => {
    const f = expect(() => requireResolve("@nfts/gmfxxx")).toThrow();
  });
});
