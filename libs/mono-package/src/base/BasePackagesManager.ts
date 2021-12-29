export interface IPackagesManager {}

export abstract class BasePackagesManager implements IPackagesManager {
	abstract install(): Promise<void>;
	abstract uninstall(): Promise<void>;
	abstract link(): Promise<void>;
	abstract workspace(): Promise<void>;
}
