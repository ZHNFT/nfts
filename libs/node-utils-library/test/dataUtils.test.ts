import { array as ArrayUtils, object as ObjectUtils } from '../src/utilities';

describe('ArrayUtils 测试用例', function () {
  test('生成指定长度的数组', () => {
    //
    expect(ArrayUtils.arrayOf(5, null).length).toBe(5);
    expect(ArrayUtils.arrayOf(5, 'null')).toStrictEqual(['null', 'null', 'null', 'null', 'null']);
  });

  test('merge方法', () => {
    expect(ObjectUtils.merge({ a: '12' }, { b: '13' })).toStrictEqual({
      a: '12',
      b: '13'
    });
  });

  test('Merge should return correct content', () => {
    const complexObjA = {
      a: '12',
      c: [11, 2],
      d: {
        m1: '12',
        m2: '12'
      }
    };

    const complexObjB = {
      b: '12',
      c: [12, 3, 4],
      d: {
        m1: '13'
      }
    };

    const obj = ObjectUtils.merge(complexObjA, complexObjB, { deep: true }) as Record<string, unknown>;

    expect(obj.a).toBe('12');
    expect(obj.b).toBe('12');
    expect(obj.c).toStrictEqual([12, 3, 4]);
    // @ts-ignore
    expect(obj.d.m1).toStrictEqual('13');
    // @ts-ignore
    expect(obj.d.m2).toStrictEqual('12');
    expect(obj !== complexObjA).toBeTruthy();
    expect(obj !== complexObjB).toBeTruthy();
  });

  it('should return correct', () => {
    //
    const a = {
      min_position: 7,
      has_more_items: false,
      items_html: 'Bus',
      new_latent_count: 9,
      data: {
        length: 22,
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      numericalArray: [31, 28, 25, 30, 32],
      StringArray: ['Carbon', 'Carbon', 'Oxygen', 'Nitrogen'],
      multipleTypesArray: 5,
      objArray: [
        {
          class: 'lower',
          age: 2
        },
        {
          class: 'middle',
          age: 5
        },
        {
          class: 'upper',
          age: 4
        },
        {
          class: 'upper',
          age: 1
        },
        {
          class: 'middle',
          age: 2
        }
      ]
    };

    const b = {
      data: {
        text: 'aaa'
      }
    };

    expect((ObjectUtils.merge(a, b, { deep: true }) as typeof a).data.text).toBe('aaa');
    expect((ObjectUtils.merge(a, b, { deep: true }) as typeof a).data.length).toBe(22);
    expect((ObjectUtils.merge(a, b, { deep: true }) as typeof a).objArray[0].age).toBe(2);
  });
});
