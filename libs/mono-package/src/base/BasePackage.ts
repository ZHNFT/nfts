export interface IBasePackage {
	packagePath: string;
}

export interface IBasePackageInitOptions extends IBasePackage {}

export class BasePackage implements IBasePackage {
	name: string;
	version: string;
	packagePath: string;

	public constructor({ packagePath }: IBasePackageInitOptions) {
		this.packagePath = packagePath;
	}
}
