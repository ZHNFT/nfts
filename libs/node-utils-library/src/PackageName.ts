export class PackageName {
  readonly scope: string | undefined;
  readonly value: string;

  public static isValidName = (name: string): boolean => PackageName.nameRegex.test(name);

  public static nameRegex = /^(?:@([^/]+?)[/])?([^/]+?)$/;

  constructor(name: string) {
    /**/
    if (!PackageName.isValidName(name)) {
      throw new Error(`Invalid package name: ${name}`);
    }

    const [, packageScope, packageName] = PackageName.nameRegex.exec(name);

    this.scope = packageScope;
    this.value = packageName;
  }

  get name(): string {
    return this.scope ? `@${this.scope}/${this.name}` : this.name;
  }
}
