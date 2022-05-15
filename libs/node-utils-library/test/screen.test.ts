import { clearScreen } from "../src/terminal";

describe("screen上的方法测试", function () {
  test("清空屏幕输出", (done) => {
    clearScreen();
    done();
  });
});
