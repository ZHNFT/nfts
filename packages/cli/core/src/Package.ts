/**
 *  @class Package
 *  @description 一个实例代表一个package的所有相关数据
 */
import path from "path";
import { readdirSync, statSync } from "fs";
import { readJSONSync } from "fs-extra";

export class Package {
  root: string;
  dirs: string[];
  json: { [prop: string]: unknown };

  constructor(root: string = process.cwd()) {
    this.root = root;
    this.json = readJSONSync(path.resolve(root, "package.json"));
    this.dirs = readdirSync(root).filter((dir) => statSync(dir).isDirectory());
  }
}
