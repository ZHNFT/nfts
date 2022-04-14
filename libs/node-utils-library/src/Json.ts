/**
 * 读取 JSON 文件数据
 * @param filename
 */
import * as fs from 'fs';

export async function readJson<T = unknown>(filename: string): Promise<T> {
  let chunk = '';

  if (!fs.existsSync(filename)) {
    throw Error(`File not find: ${filename}`);
  }

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

export function readJsonSync<T = unknown>(filename: string): T {
  if (!fs.existsSync(filename)) {
    throw Error(`File not find: ${filename}`);
  }

  const jsonString = fs.readFileSync(filename).toString('utf-8');

  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    throw new Error(`JSONParse error: ${filename}`);
  }
}
