export class Package {}

export class PackageName {
  readonly name: string;
}

export class PackageScopedName extends PackageName {
  readonly scope: string;
}

export class PackageVersion {
  readonly version: string;

  readonly major: string;
  readonly minor: string;
  readonly patch: string;
}

export class PackageAuthor {
  readonly author: string;
}
