/**
 * 对于常用文件操作的补充方法
 * @status WIP
 * */
import nodeFs from 'fs';
import nodePath from 'path';
import { serialize } from '../execution';

export interface IFileOperationOpts {
  cwd?: string;
}

export interface IWriteFileOpts extends IFileOperationOpts {
  ensureRoot?: boolean;
}

export const defaultWriteFileOpts = {
  ensureRoot: true
};

/**
 * 写文件内容，同时生成文件所处的文件夹
 * @param {string} filename
 * @param {string} content
 * @param usrOptions
 */
export async function writeFile(filename: string, content: string, usrOptions?: IWriteFileOpts): Promise<void> {
  if (!usrOptions) {
    usrOptions = defaultWriteFileOpts;
  } else {
    usrOptions = Object.assign({}, defaultWriteFileOpts, usrOptions);
  }

  const dirsReadyToCreate: string[] = [];
  let parentDir = nodePath.dirname(filename);

  if (!usrOptions.ensureRoot) {
    await nodeFs.promises.writeFile(filename, content);
    return;
  }

  while (!nodeFs.existsSync(parentDir)) {
    dirsReadyToCreate.unshift(parentDir);
    const nextParentDir = nodePath.dirname(parentDir);

    if (nextParentDir === parentDir) {
      break;
    } else {
      parentDir = nextParentDir;
    }
  }
  await serialize(dirsReadyToCreate.map(dir => () => mkdir(dir)));
  await nodeFs.promises.writeFile(filename, content);
}

/**
 * 创建文件夹的方法，不会抛出重复创建的异常
 * @param dirname
 * @param options
 */
export async function mkdir(
  dirname: string,
  options?: {
    throwWhenExist?: boolean;
  }
): Promise<void> {
  try {
    await nodeFs.promises.mkdir(dirname);
  } catch (e: unknown) {
    // 经过前面的检查，不知道到这里还还会有什么错误，
    // 没有权限？？？
    if (
      (options?.throwWhenExist && (e as NodeJS.ErrnoException).code === 'EEXIST') ||
      (e as NodeJS.ErrnoException).code !== 'EEXIST'
    ) {
      throw e;
    }
  }
}

/**
 * 通过记录遍历的文件夹名称，
 * 避免因为有 symlink 造成递归的栈溢出；
 */
const RecursionDirCache: Set<number> = new Set();

function createStat(stat: nodeFs.Stats, extraProps: { [key: string]: unknown }): nodeFs.Stats {
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
 * @param     {string}                     dirname  目标目录
 * @param     {{ stat?: boolean }}         options 选项
 * @param     {(nodeFs.Stats | string)[]}      files   所有递归到的文件都会被放到files中，默认为undefined
 * @returns   {(nodeFs.Stats | string)[]}
 */
export function readDirRecursionSync(
  dirname: string,
  options: { stat?: boolean } = {},
  files?: (nodeFs.Stats | string)[]
): (nodeFs.Stats | string)[] {
  if (!files || !Array.isArray(files)) {
    RecursionDirCache.clear();
    files = [];
  }

  const stat = nodeFs.statSync(dirname);
  if (!stat.isDirectory()) {
    return files;
  }

  const subFileAndDirs = nodeFs.readdirSync(dirname);

  for (let i = 0; i < subFileAndDirs.length; i++) {
    const _path = nodePath.resolve(dirname, subFileAndDirs[i]);
    const _stat = nodeFs.statSync(_path);

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

/**
 * 测试文件是否存在，是否可访问
 */
export function accessFile(path: string, mode?: number): void | never {
  try {
    nodeFs.accessSync(path, mode);
  } catch (e) {
    throw new Error(`Can't access ${path}, make sure you have permission or file is not exist`);
  }
}

export async function rmdirRecursion(path: string): Promise<void> {
  const isFolder = (path: string): boolean => {
    return nodeFs.statSync(path).isDirectory();
  };

  if (!isFolder(path)) {
    throw new Error(`Not a folder`);
  }

  const files = (await nodeFs.promises.readdir(path)).map(filePath => nodePath.resolve(path, filePath));

  for await (const filePath of files) {
    if (isFolder(filePath)) {
      await rmdirRecursion(filePath);
    } else {
      await nodeFs.promises.unlink(filePath);
    }
  }
}
