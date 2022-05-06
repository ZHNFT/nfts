import { ArrayUtils, ObjectUtils } from '../src/DataUtils';

describe('ArrayUtils 测试用例', function () {
  test('生成指定长度的数组', () => {
    //
    expect(ArrayUtils.arrayOf(5, null).length).toBe(5);
    expect(ArrayUtils.arrayOf(5, 'null')).toStrictEqual(['null', 'null', 'null', 'null', 'null']);
  });

  test('merge方法', () => {
    const complexObjA = {
      a: '12',
      c: [11, 2],
      d: {
        m1: '12'
      }
    };

    const complexObjB = {
      b: '12',
      c: [12, 3, 4],
      d: {
        m1: '13'
      }
    };

    expect(ObjectUtils.merge({ a: '12' }, { b: '13' })).toStrictEqual({
      a: '12',
      b: '13'
    });

    expect(ObjectUtils.merge(complexObjA, complexObjB, { deep: true })).toStrictEqual({
      a: '12',
      b: '12',
      c: [12, 3, 4],
      d: {
        m1: '13'
      }
    });
  });
});
