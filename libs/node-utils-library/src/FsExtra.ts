/**
 * 对于常用文件操作的补充方法
 * @status WIP
 * */
import nodeFs from "fs";
import nodePath from "path";
import { serialize } from "./Execution";

export interface IFileOperationOpts {
  cwd?: string;
}

export interface IWriteFileOpts extends IFileOperationOpts {
  ensureRoot?: boolean;
}

export interface IMkdirOpts extends IFileOperationOpts {
  throwWhenExist?: boolean;
}

export const defaultWriteFileOpts = {
  ensureRoot: true,
};

/**
 * 写文件内容，同时生成文件路径
 * @param filename
 * @param content
 * @param usrOptions
 */
export async function writeFile(
  filename: string,
  content: string,
  usrOptions: IWriteFileOpts = {}
): Promise<void> {
  usrOptions = Object.assign({}, defaultWriteFileOpts, usrOptions);

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
  await serialize(
    dirsReadyToCreate.map((dir) => () => mkdir(dir)),
    {}
  );
  await nodeFs.promises.writeFile(filename, content);
}

/**
 * 创建文件夹的方法，不会抛出重复创建的异常
 * @param dirname
 * @param options
 */
export async function mkdir(
  dirname: string,
  options?: IMkdirOpts
): Promise<void> {
  try {
    await nodeFs.promises.mkdir(dirname);
  } catch (e: unknown) {
    // 经过前面的检查，不知道到这里还还会有什么错误，
    // 没有权限？？？
    if (
      (options?.throwWhenExist &&
        (e as NodeJS.ErrnoException).code === "EEXIST") ||
      (e as NodeJS.ErrnoException).code !== "EEXIST"
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

function createStat(
  stat: nodeFs.Stats,
  extraProps: { [key: string]: unknown }
): nodeFs.Stats {
  for (const extraPropsKey in extraProps) {
    if (Object.prototype.hasOwnProperty.call(extraProps, extraPropsKey)) {
      Object.defineProperty(stat, extraPropsKey, {
        value: extraProps[extraPropsKey],
      });
    }
  }

  return stat;
}

/**
 * 递归读取文件夹中的文件
 * @param dirname 目标目录
 * @param options 选项
 * @param files   所有递归到的文件都会被放到files中，默认为undefined
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

  dirname = nodePath.resolve(dirname);

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
 * @param path
 * @param mode
 */
export function accessFile(path: string, mode?: number): void | never {
  try {
    nodeFs.accessSync(path, mode);
  } catch (e) {
    throw new Error(
      `Can't access ${path}, make sure you have permission or file is not exist`
    );
  }
}

/**
 * 递归删除文件夹
 * @param path
 */
export async function rmdirRecursion(path: string): Promise<void> {
  const isFolder = (path: string): boolean => {
    return nodeFs.statSync(path).isDirectory();
  };

  if (!isFolder(path)) {
    throw new Error(`Not a folder`);
  }

  const files = (await nodeFs.promises.readdir(path)).map((filePath) =>
    nodePath.resolve(path, filePath)
  );

  for await (const filePath of files) {
    if (isFolder(filePath)) {
      await rmdirRecursion(filePath);
    } else {
      await nodeFs.promises.unlink(filePath);
    }
  }

  //  删除完所有的文件之后，删除文件夹
  await nodeFs.promises.rmdir(path);
}

/**
 * 读取JSON文件内容
 * @param filename
 */
export async function readJson<T = unknown>(filename: string): Promise<T> {
  accessFile(filename);
  let chunk = "";

  return await new Promise<T>((resolve, reject) => {
    nodeFs
      .createReadStream(filename)
      .on("data", (_chunk) => {
        chunk += _chunk;
      })
      .on("end", () => {
        resolve(JSON.parse(chunk) as T);
      })
      .on("error", reject);
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
    return JSON.parse(buf.toString("utf-8")) as T;
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
