/**
 * 创建指定长度的数组
 * @type {[type]}
 */
export function arrayOf<T = unknown>(count: number, initialValue: T): T[] {
	return new Array(count).fill(initialValue) as Array<T>;
}
