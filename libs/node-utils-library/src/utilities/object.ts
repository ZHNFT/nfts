/**
 * 合并 array 对象
 * @param left
 * @param right
 * @private
 */
export function mergeArray(left: Array<unknown>, right: Array<unknown>) {
  // 创建一个数组元素
  const arr = new Array(left.length).fill(null).map((_, i) => {
    return left[i];
  });

  for (let i = 0; i < right.length; i++) {
    arr[i] = merge(arr[i], right[i], { deep: true });
  }

  return arr;
}

/**
 * 合并 object 对象
 * @param left
 * @param right
 * @private
 */
export function mergeObject(left: Record<string | number, unknown>, right: Record<string | number, unknown>) {
  // 创建一个新的副本
  const obj = Object.assign(Object.create(null) as Record<string | number, unknown>, left);

  for (const rightKey in right) {
    if (Object.prototype.hasOwnProperty.call(right, rightKey)) {
      obj[rightKey] = merge(obj[rightKey], right[rightKey], { deep: true });
    }
  }

  return obj;
}

/**
 * 合并 set 对象
 * @param left
 * @param right
 * @private
 */
export function mergeSet(left: Set<unknown>, right: Set<unknown>) {
  const arrLeft = Array.from(left);
  const arrRight = Array.from(right);
  const mergedArr = merge(arrLeft, arrRight, { deep: true }) as Array<unknown>;

  const _new = new Set<unknown>();
  _new.clear();

  for (const mergedArrElement of mergedArr) {
    _new.add(mergedArrElement);
  }

  return _new;
}

/**
 * 合并 map 对象
 * @method mergeMap
 * @param  {Map<string, unknown>} left  [description]
 * @param  {Map<string, unknown>} right [description]
 */
export function mergeMap(left: Map<string, unknown>, right: Map<string, unknown>) {
  const _new = new Map<string, unknown>();

  for (const key in right.keys()) {
    _new.set(key, merge(left.get(key), right.get(key)));
  }

  return _new;
}

/**
 * 合并buffer
 * @method mergeBuffer
 * @param  {Buffer}    left  [description]
 * @param  {Buffer}    right [description]
 * @return {Buffer}          [description]
 */
export function mergeBuffer(left: Buffer, right: Buffer): Buffer {
  const sizeLeft = left.length;
  const sizeRight = right.length;
  return Buffer.alloc(sizeLeft > sizeRight ? sizeLeft : sizeRight).fill(right);
}

export enum DataTypes {
  array = 'array',
  object = 'object',
  set = 'set',
  map = 'map',
  regexp = 'regexp',
  null = 'null',
  date = 'date',
  bigint = 'bigint',
  symbol = 'symbol',
  // nodejs
  buffer = 'buffer'
}

/**
 * 类型判断
 * @method typeOf
 * @param  {unknown} data [description]
 * @return {DataTypes}    [description]
 */
export function typeOf(data: unknown): keyof typeof DataTypes {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase() as keyof typeof DataTypes;
}

export interface IMergeOptions {
  deep: boolean;
}

/**
 * 合并对象
 * @method merge
 * @param  {unknown}  left     [description]
 * @param  {unknown}  right    [description]
 * @param  {false }   usrOpts  [description]
 * @return {unknown}           [description]
 */
export function merge(left: unknown, right: unknown, usrOpts: IMergeOptions = { deep: false }): unknown {
  // 如果是全相等的两个数据，返回left
  if (left === right) {
    return left;
  }

  let newLeft: unknown;

  if (typeOf(left) !== typeOf(right)) {
    return right;
  }

  if (usrOpts.deep) {
    switch (typeOf(left)) {
      case 'array':
        newLeft = mergeArray(left as Array<unknown>, right as Array<unknown>);
        break;
      case 'object':
        newLeft = mergeObject(left as Record<string, unknown>, right as Record<string, unknown>);
        break;
      case 'map':
        newLeft = mergeMap(left as Map<string, unknown>, right as Map<string, unknown>);
        break;
      case 'set':
        newLeft = mergeSet(left as Set<unknown>, right as Set<unknown>);
        break;
      case 'buffer':
        newLeft = mergeBuffer(left as Buffer, right as Buffer);
        break;
      default:
        newLeft = right;
        break;
    }

    return newLeft;
  } else {
    return Object.assign({}, left, right);
  }
}
