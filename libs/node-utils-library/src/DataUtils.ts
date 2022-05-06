/*
 * A set of array functions
 * */
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
    for (let i = 0; i < right.length; i++) {
      left[i] = ObjectUtils.merge(left[i], right[i], { deep: true });
    }

    return left;
  }

  /**
   * 深度合并对象
   * @param left
   * @param right
   * @private
   */
  private static mergeObject(left: Record<string, unknown>, right: Record<string, unknown>) {
    for (const rightKey in right) {
      if (Object.prototype.hasOwnProperty.call(right, rightKey)) {
        left[rightKey] = ObjectUtils.merge(left[rightKey], right[rightKey], { deep: true });
      }
    }

    return left;
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

    left.clear();

    for (const mergedArrElement of mergedArr) {
      left.add(mergedArrElement);
    }

    return left;
  }

  private static mergeMap(left: Map<string, unknown>, right: Map<string, unknown>) {
    //
    for (const key in right.keys()) {
      left.set(key, ObjectUtils.merge(left.get(key), right.get(key)));
    }

    return left;
  }

  /**
   * 浅合并，合并会作用在left参数上，并返回
   * @param left
   * @param right
   * @param mergeOptions
   * @return left
   */
  public static merge(
    left: unknown,
    right: unknown,
    mergeOptions: {
      deep: boolean;
    } = { deep: false }
  ): unknown {
    // 如果是全相等的两个数据，返回left
    if (left === right) {
      return left;
    }

    if (mergeOptions.deep) {
      // Start deep-merge
      // 深拷贝需要注意的点：
      // 1. 对于循环应用的处理；
      // 2. 数组按下标进行合并；
      // 3. 对象按键值进行合并；
      /*
       * 一些特殊情况不用处理，直接返回 right；
       * */
      if (typeof left !== typeof right) {
        return (left = right);
      }
      // 1. object 2. array 3. set 4. map 5. null 6. RegExp 7. Date 8. Buffer
      // TODO 有待补充 typeof 为 'object' 的数据类型
      if (typeof left === 'object' && typeof right === 'object') {
        switch (ObjectUtils.typeof(left)) {
          case 'array':
            left = ObjectUtils.mergeArray(left as Array<unknown>, right as Array<unknown>);
            break;
          case 'object':
            left = ObjectUtils.mergeObject(left as Record<string, unknown>, right as Record<string, unknown>);
            break;
          case 'map':
            left = ObjectUtils.mergeMap(left as Map<string, unknown>, right as Map<string, unknown>);
            break;
          case 'set':
            left = ObjectUtils.mergeSet(left as Set<unknown>, right as Set<unknown>);
            break;
          default:
            left = right;
            break;
        }
      }
      return right;
    } else {
      return Object.assign(left, right);
    }
  }
}
