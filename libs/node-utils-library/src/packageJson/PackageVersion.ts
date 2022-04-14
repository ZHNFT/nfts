/**
 * @deprecated
 * */
export enum VersionFieldsEnum {
  major = 'major',
  minor = 'minor',
  patch = 'patch'
}

export class PackageVersion {
  private _oldVersion: string;

  protected major: string;
  protected minor: string;
  protected patch: string;

  public static versionRegex = /(?<major>[0-9]+).(?<minor>[0-9]+).(?<patch>[0-9]+)/;

  public static isValidVersion = (version: string): boolean =>
    PackageVersion.versionRegex.test(version);

  constructor(version: string) {
    if (!PackageVersion.isValidVersion(version)) {
      throw new Error(`Invalid valid version: ${version}`);
    }
    const [, major, minor, patch] = PackageVersion.versionRegex.exec(version);
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this._oldVersion = version;
  }

  get version(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  public updateMajor(majorValue: string): string {
    return this._updateVersionField(VersionFieldsEnum.major, majorValue);
  }

  public updateMinor(majorValue: string): string {
    return this._updateVersionField(VersionFieldsEnum.minor, majorValue);
  }

  public updatePatch(majorValue: string): string {
    return this._updateVersionField(VersionFieldsEnum.patch, majorValue);
  }

  private _updateVersionField(field: keyof typeof VersionFieldsEnum, fieldValue: string) {
    this._oldVersion = this.version;
    this[field] = fieldValue;
    return this.version;
  }
}
