export class ArrayUtils {
  public static arrayOf<T = unknown>(count: number, initialValue: T): Array<T> {
    return new Array(count).fill(initialValue) as Array<T>;
  }
}

export enum ObjectTypes {
  array = 'array',
  object = 'object',
  set = 'set',
  map = 'map',
  regexp = 'regexp',
  null = 'null',
  date = 'date',
  // nodejs
  buffer = 'buffer'
}

/*
 * A set of object functions
 * */
export class ObjectUtils {
  public static typeof(data: unknown): keyof typeof ObjectTypes {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase() as keyof typeof ObjectTypes;
  }

  /**
   * 深度合并数组
   * @param left
   * @param right
   * @private
   */
  private static mergeArray(left: Array<unknown>, right: Array<unknown>) {
    // 创建一个数组元素
    const arr = new Array(left.length).fill(null).map((_, i) => {
      return left[i];
    });

    for (let i = 0; i < right.length; i++) {
      arr[i] = ObjectUtils.merge(arr[i], right[i], { deep: true });
    }

    return arr;
  }

  /**
   * 深度合并对象
   * @param left
   * @param right
   * @private
   */
  private static mergeObject(left: Record<string | number, unknown>, right: Record<string | number, unknown>) {
    // 创建一个新的副本
    const obj = Object.assign(Object.create(null) as Record<string | number, unknown>, left);

    for (const rightKey in right) {
      if (Object.prototype.hasOwnProperty.call(right, rightKey)) {
        obj[rightKey] = ObjectUtils.merge(obj[rightKey], right[rightKey], { deep: true });
      }
    }

    return obj;
  }

  /**
   * 深度合并set
   * @param left
   * @param right
   * @private
   */
  private static mergeSet(left: Set<unknown>, right: Set<unknown>) {
    const arrLeft = Array.from(left);
    const arrRight = Array.from(right);
    const mergedArr = ObjectUtils.merge(arrLeft, arrRight, { deep: true }) as Array<unknown>;

    const _new = new Set<unknown>();
    _new.clear();

    for (const mergedArrElement of mergedArr) {
      _new.add(mergedArrElement);
    }

    return _new;
  }

  private static mergeMap(left: Map<string, unknown>, right: Map<string, unknown>) {
    const _new = new Map<string, unknown>();

    for (const key in right.keys()) {
      _new.set(key, ObjectUtils.merge(left.get(key), right.get(key)));
    }

    return _new;
  }

  private static mergeBuffer(left: Buffer, right: Buffer): Buffer {
    const sizeLeft = left.length;
    const sizeRight = right.length;
    return Buffer.alloc(sizeLeft > sizeRight ? sizeLeft : sizeRight).fill(right);
  }

  /**
   * 浅合并，合并会作用在left参数上，并返回
   * @param left
   * @param right
   * @param mergeOptions
   * @return left
   */
  public static merge(left: unknown, right: unknown, mergeOptions: { deep: boolean } = { deep: false }): unknown {
    // 如果是全相等的两个数据，返回left
    if (left === right) {
      return right;
    }

    let newLeft: unknown;

    if (mergeOptions.deep) {
      if (ObjectUtils.typeof(left) !== ObjectUtils.typeof(right)) {
        return right;
      } else {
        // 1. object 2. array 3. set 4. map 5. null 6. RegExp 7. Date 8. Buffer
        switch (ObjectUtils.typeof(left)) {
          case 'array':
            newLeft = ObjectUtils.mergeArray(left as Array<unknown>, right as Array<unknown>);
            break;
          case 'object':
            newLeft = ObjectUtils.mergeObject(left as Record<string, unknown>, right as Record<string, unknown>);
            break;
          case 'map':
            newLeft = ObjectUtils.mergeMap(left as Map<string, unknown>, right as Map<string, unknown>);
            break;
          case 'set':
            newLeft = ObjectUtils.mergeSet(left as Set<unknown>, right as Set<unknown>);
            break;
          case 'buffer':
            newLeft = ObjectUtils.mergeBuffer(left as Buffer, right as Buffer);
            break;
          default:
            newLeft = right;
            break;
        }
      }
      return newLeft;
    } else {
      return Object.assign(left, right);
    }
  }
}
