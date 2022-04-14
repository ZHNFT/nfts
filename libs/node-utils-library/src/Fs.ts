import * as fs from 'fs';
import * as path from 'path';
import { serialize } from './Sync';

export interface WriteFileOptions {
  ensureRoot?: boolean;
  cwd?: string;
}

const writeFileDefaultOptions = {
  ensureRoot: true,
  cwd: './'
};

/**
 * 写文件内容，同时生成文件所处的文件夹
 * @param filename
 * @param content
 * @param options  { ensureRoot }
 */
export async function writeFile(
  filename: string,
  content: string,
  options?: WriteFileOptions
): Promise<void> {
  if (!options) {
    options = writeFileDefaultOptions;
  } else {
    options = Object.assign({}, writeFileDefaultOptions, options);
  }

  const dirsReadyToCreate: string[] = [];
  let parentDir = path.dirname(filename);

  if (!options.ensureRoot) {
    return fs.promises.writeFile(filename, content);
  }

  while (!fs.existsSync(parentDir)) {
    dirsReadyToCreate.unshift(parentDir);
    const nextParentDir = path.dirname(parentDir);

    if (nextParentDir === parentDir) {
      break;
    } else {
      parentDir = nextParentDir;
    }
  }
  await serialize(dirsReadyToCreate.map(dir => () => mkdir(dir)));
  await fs.promises.writeFile(filename, content);
}

/**
 * 创建文件夹的方法，不会抛出重复创建的异常
 * @param dirname
 */
export async function mkdir(dirname: string): Promise<void> {
  if (fs.existsSync(dirname)) {
    return Promise.resolve();
  } else {
    try {
      await fs.promises.mkdir(dirname);
    } catch (e: unknown) {
      if ((e as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw e;
      }
    }
  }
}
