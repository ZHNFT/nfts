/**
 *  @class Package
 *  @description 一个实例代表一个package的所有相关数据
 */
import { readdirSync, statSync } from "fs";

export class Package {
  root: string;
  dirs: string[];

  constructor(root: string = process.cwd()) {
    this.root = root;
    this.dirs = readdirSync(root).filter((dir) => statSync(dir).isDirectory());
  }
}
