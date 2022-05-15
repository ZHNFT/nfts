import { readDirRecursionSync } from "../src/fs-extra";

describe("文件操作测试", () => {
  test("递归解析文件夹中的文件", () => {
    readDirRecursionSync("./node_modules");
  });
});
