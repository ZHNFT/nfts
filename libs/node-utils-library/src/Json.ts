/**
 * 封装关于 JSON 操作的一些方法
 * @status WIP
 */
import * as fs from 'fs';

/**
 * 异步读取 JSON 文件数据
 * @param filename
 */
export async function readJson<T = unknown>(filename: string): Promise<T> {
  accessFile(filename);
  let chunk = '';

  return await new Promise<T>((resolve, reject) => {
    fs.createReadStream(filename)
      .on('data', _chunk => {
        chunk += _chunk;
      })
      .on('end', () => {
        resolve(JSON.parse(chunk) as T);
      })
      .on('error', reject);
  });
}

/**
 * 同步读取 JSON 文件
 * @param filename
 */
export function readJsonSync<T = unknown>(filename: string): T {
  accessFile(filename);

  const jsonString = fs.readFileSync(filename).toString('utf-8');

  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    throw new Error(`JSONParse error: ${filename}`);
  }
}

export async function writeJson<T>(
  filename: string,
  data: Partial<T>,
  mode: JsonWriteMode = JsonWriteMode.Replace
): Promise<void> {
  accessFile(filename);
  let raw: T;
  //
  await Promise.resolve();
}

export enum JsonWriteMode {
  Merge,
  DeepMerge,
  Replace
}

export function writeJsonSync<T = unknown>(
  filename: string,
  data: Partial<T>,
  mode: JsonWriteMode = JsonWriteMode.Replace
): void {
  accessFile(filename);
  let raw: T;

  switch (mode) {
    case JsonWriteMode.Merge:
    case JsonWriteMode.DeepMerge:
      //todo Fix Merge Write
      break;
    case JsonWriteMode.Replace:
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      break;
    default:
  }
}

/**
 * 测试文件是否存在，是否可访问
 */
export function accessFile(path: string, mode?: number): void | never {
  try {
    fs.accessSync(path, mode);
  } catch (e) {
    throw new Error(
      `Can't access ${path}, make sure you have permission or path id exist`
    );
  }
}

/**
 * 字符串化数据
 * @param data
 */
export function stringify(data: unknown): string {
  switch (typeof data) {
    case 'undefined':
    case 'symbol':
    case 'function':
    case 'bigint':
      return '';
  }
}
