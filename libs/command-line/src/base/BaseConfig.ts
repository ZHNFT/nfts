export interface IBaseConfigInitOptions {
	configPath: string;
}

export class BaseConfig {
	_configPath: string;

	protected constructor(opts: IBaseConfigInitOptions) {
		this._configPath = opts.configPath;
	}
}
