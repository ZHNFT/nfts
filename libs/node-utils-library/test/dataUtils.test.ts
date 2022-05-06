import { ArrayUtils } from '../src/DataUtils';

describe('ArrayUtils 测试用例', function () {
  test('生成指定长度的数组', () => {
    //
    expect(ArrayUtils.arrayOf(5, null).length).toBe(5);
    expect(ArrayUtils.arrayOf(5, 'null')).toStrictEqual(['null', 'null', 'null', 'null', 'null']);
  });
});
