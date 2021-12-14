export class Superior {
	prepare(): Superior {
		this._readOptionsFromConfiguration();
		/**
		 * 读取命令行配置
		 */
		return this;
	}

	_readOptionsFromConfiguration() {
		//
	}

	_readConfigFromCommandOptions() {
		//
	}

	async execute(): Promise<void> {
		console.log('execute');
	}
}
