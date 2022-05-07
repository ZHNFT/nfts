import { existsSync } from 'fs';
import { FileSystem } from '@nfts/node-utils-library';
import Constants from '../Constants';

export enum TargetKinds {
	'CommonJS',
	'AMD',
	'UMD',
	'ESNext',
	'System'
}

export interface IGmfConfig {
	bundle: {
		entry: string | string[];
		target: TargetKinds;
	};
	plugins: {
		pluginName: string;
		options: Record<string, unknown>;
	}[];
}

/**
 * gmf 需要的配置文件，
 */
export class Configuration {
	config: IGmfConfig;

	public loadConfig(): IGmfConfig | undefined {
		if (this.config) return this.config;

		if (!existsSync(Constants.GMF_CONFIG_PATH)) {
			return undefined;
		}

		return (this.config = FileSystem.readJsonSync(Constants.GMF_CONFIG_PATH));
	}

	public loadConfigFromFile(filePath: string): IGmfConfig | undefined {
		//
		if (this.config) return this.config;

		if (!existsSync(filePath)) {
			return undefined;
		}

		return (this.config = FileSystem.readJsonSync(filePath));
	}
}
