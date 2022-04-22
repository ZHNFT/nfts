import { cleanScreen } from '../src/Screen';

describe('screen上的方法测试', function () {
  test('清空屏幕输出', () => {
    //
    console.log(1);
    console.log(2);
    console.log(3);
    console.log(4);
    cleanScreen();
  });
});
