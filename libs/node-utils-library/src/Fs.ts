/**
 * 对于常用文件操作的补充方法
 * @status WIP
 * */
import * as fs from 'fs';
import * as path from 'path';
import { serialize } from './Async';

export interface IFileOperationOpts {
  cwd?: string;
}

export interface WriteFileOpts extends IFileOperationOpts {
  ensureRoot?: boolean;
}

const writeFileDefaultOpts = {
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
  options?: WriteFileOpts
): Promise<void> {
  if (!options) {
    options = writeFileDefaultOpts;
  } else {
    options = Object.assign({}, writeFileDefaultOpts, options);
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

const RecursionDirCache: Set<number> = new Set();

function createStat(stat: fs.Stats, extraProps: { [key: string]: unknown }): fs.Stats {
  for (const extraPropsKey in extraProps) {
    if (Object.prototype.hasOwnProperty.call(extraProps, extraPropsKey)) {
      Object.defineProperty(stat, extraPropsKey, {
        value: extraProps[extraPropsKey]
      });
      // Object.assign(stat, extraPropsKey, extraProps[extraPropsKey]);
    }
  }

  return stat;
}

/**
 * 递归读取文件夹中的文件
 */
// export function readDirRecursion(
//   dirname: string,
//   files?: fs.Stats[]
// ): Promise<fs.Stats[]> {
//   const stat = fs.statSync(dirname);
// }

/**
 * 递归读取文件夹中的文件
 */
export function readDirRecursionSync(
  dirname: string,
  options: { stat?: boolean } = {},
  files: (fs.Stats | string)[] = []
): (fs.Stats | string)[] {
  const stat = fs.statSync(dirname);
  if (!stat.isDirectory()) {
    return files;
  }

  const subFileAndDirs = fs.readdirSync(dirname);

  for (let i = 0; i < subFileAndDirs.length; i++) {
    const _path = path.resolve(dirname, subFileAndDirs[i]);
    const _stat = fs.statSync(_path);

    if (_stat.isFile()) {
      files.push(options.stat ? createStat(_stat, { filepath: _path }) : _path);
    }

    if (_stat.isDirectory()) {
      if (!RecursionDirCache.has(_stat.ino)) {
        RecursionDirCache.add(_stat.ino);
        readDirRecursionSync(_path, options, files);
      }
    }
  }

  return files;
}
