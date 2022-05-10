import { Measure } from '../Measure';

describe('事件格式化测试', () => {
  test('毫秒数格式化', () => {
    expect(Measure.msFormat(6 * (1000 * 60 * 60) + 59 * (60 * 1000) + 59 * 1000)).toStrictEqual('6h59m59s');
    expect(Measure.msFormat(0 * (1000 * 60 * 60) + 59 * (60 * 1000) + 59 * 1000)).toStrictEqual('59m59s');
    expect(Measure.msFormat(0 * (1000 * 60 * 60) + 0 * (60 * 1000) + 59 * 1000)).toStrictEqual('59s');
    expect(Measure.msFormat(0 * (1000 * 60 * 60) + 0 * (60 * 1000) + 32 * 1000 + 321)).toStrictEqual('32s321ms');
  });
});
