export class PackageName {
  readonly scope: string | undefined;
  readonly value: string;
  /**
   * 测试 package name 是否符合要求
   * @param name
   * @returns boolean
   */
  public static isValidName = (name: string): boolean => PackageName.nameRegex.test(name);
  /**
   * 校验 package name 的正则表达式
   */
  public static nameRegex = /^(?:@([^/]+?)[/])?([^/]+?)$/;
  /**
   *
   * @param name
   */
  constructor(name: string) {
    /**/
    if (!PackageName.isValidName(name)) {
      throw new Error(`Invalid package name: ${name}\n` + `Expecting "xx" / "xx-xx" / "@scope/xx" / "@scope/xx-xx"`);
    }

    const [, packageScope, packageName] = PackageName.nameRegex.exec(name) as string[];

    this.scope = packageScope;
    this.value = packageName;
  }

  get name(): string {
    return this.scope ? `@${this.scope}/${this.name}` : this.name;
  }
}
