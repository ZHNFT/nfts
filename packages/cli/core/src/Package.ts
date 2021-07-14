/**
 *  @class Package
 *  @description 一个实例代表一个package的所有相关数据
 */
import path from "path";
import { readdirSync, statSync } from "fs";
import fsExtra from "fs-extra";

const { readJSONSync } = fsExtra;

export type IPackage = {
  name: string;
  version: string;
  author: string;
  dependencies: { [prop: string]: string };
  devDependencies: { [prop: string]: string };
  peerDependencies: { [prop: string]: string };
  [prop: string]: unknown;
};

export class Package {
  root: string;
  dirs: string[];
  json: IPackage;

  constructor(root: string = process.cwd()) {
    this.root = root;
    this.json = readJSONSync(path.resolve(root, "package.json"));
    this.dirs = readdirSync(root).filter((dir) => statSync(dir).isDirectory());
  }
}
