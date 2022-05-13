import nodeFs from 'fs';
import { writeFile, accessFile } from '../fs-extra';

/**
 * 读取JSON文件内容
 * @param filename
 */
export async function readJson<T = unknown>(filename: string): Promise<T> {
  accessFile(filename);
  let chunk = '';

  return await new Promise<T>((resolve, reject) => {
    nodeFs
      .createReadStream(filename)
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
 * 读取JSON文件内容
 * @param path
 */
export function readJsonSync<T = unknown>(path: string): T {
  accessFile(path);

  const buf = nodeFs.readFileSync(path);

  try {
    return JSON.parse(buf.toString('utf-8')) as T;
  } catch (_) {
    throw new Error(`${path} is not a valid json data`);
  }
}

/**
 * 向JSON文件写入内容
 * @param path
 * @param data
 */
export async function writeJson(path: string, data: unknown): Promise<void> {
  const dataString = JSON.stringify(data, null, 2);
  await writeFile(path, dataString);
}

/**
 * 向JSON文件写入内容
 * @param path
 * @param data
 */
export function writeJsonSync(path: string, data: unknown): void {
  accessFile(path);
  nodeFs.writeFileSync(path, JSON.stringify(data, null, 2));
}
