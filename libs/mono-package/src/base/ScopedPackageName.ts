import { PackageName } from './PackageName';

export class ScopedPackageName extends PackageName {
  public static scopedPackageRegexp = /^@([a-z]+)\/([a-z-]+)/;

  public static isScopedPackageName = (name: string): boolean =>
    ScopedPackageName.scopedPackageRegexp.test(name);

  private readonly _scopedName: string;

  constructor(name) {
    // 走一遍正则，获取匹配到的数据
    ScopedPackageName.scopedPackageRegexp.exec(name);
    super(RegExp.$1);
    this._scopedName = RegExp.$2;
  }

  get scopedPackageName() {
    return `@${this._scopedName}/${this.name}`;
  }
}
