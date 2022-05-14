export enum VersionFieldTypes {
  major = 'major',
  minor = 'minor',
  patch = 'patch'
}

export class PackageVersion {
  private prevVersion: string;
  /**
   * @type {string} major版本号
   */
  private major = '0';
  /**
   * @type {string} minor版本号
   */
  private minor = '0';
  /**
   * @type {string} patch版本号
   */
  private patch = '0';

  /**
   * @type {RegExp} 版本字符串校验正则表达式
   */
  public static versionRegex = /(?<major>[0-9]+).(?<minor>[0-9]+).(?<patch>[0-9]+)/;
  /**
   * 校验版本
   * @param version
   * @returns {boolean}
   */
  public static isValidVersion = (version: string): boolean => PackageVersion.versionRegex.test(version);

  constructor(version: string) {
    if (!PackageVersion.isValidVersion(version)) {
      throw new Error(`Invalid valid version: ${version}\n` + `Expecting "xx.xx.xx"`);
    }
    const [, major, minor, patch] = PackageVersion.versionRegex.exec(version) as string[];
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.prevVersion = version;
  }

  /**
   * @type {string} 返回当前状态的版本信息
   */
  get version(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  public updateMajor(majorValue: string): string {
    return this._updateVersionField(VersionFieldTypes.major, majorValue);
  }

  public updateMinor(majorValue: string): string {
    return this._updateVersionField(VersionFieldTypes.minor, majorValue);
  }

  public updatePatch(majorValue: string): string {
    return this._updateVersionField(VersionFieldTypes.patch, majorValue);
  }

  private _updateVersionField(field: keyof typeof VersionFieldTypes, fieldValue: string) {
    if (isNaN(Number(fieldValue)) || typeof Number(fieldValue) === 'number') {
      throw new Error(`Version ${field} field value is not valid`);
    }

    this.prevVersion = this.version;
    this[field] = fieldValue;
    return this.version;
  }
}
