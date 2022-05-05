// 生成只包含指定类型的只读数组
export function arrayOf<T>(count: number, initialValue: T): Readonly<Array<T>> {
  return new Array(count).fill(initialValue);
}
