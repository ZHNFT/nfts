import { Configuration } from '@nfts/gmf';
import {
	loadConfiguration,
	SnowpackConfig,
	SnowpackUserConfig,
	startServer,
	createConfiguration
} from 'snowpack';

const DEFAULT_CONFIG_FILE_PATH = './snowpack.config.js';

/** @type {import("snowpack").SnowpackUserConfig } */
const REACT_DEV_SNOWPACK_CONFIG = {
	plugins: ['@snowpack/plugin-react-refresh', ['@snowpack/plugin-typescript', {}]],
	devOptions: {
		open: true,
		hmr: true
	},
	mount: {
		public: { url: '/', static: true },
		src: '/dist'
	}
};

export class DevServer {
	public async runDevServer({
		config
	}: {
		config: Configuration['config'];
	}): Promise<void> {
		// 创建配置，启动 snowpack 开发服务
		const _config = createConfiguration({
			mount: {
				public: '/',
				src: '/dist'
			},
			plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-typescript']
		});
		const _devServer = await startServer(
			{
				config: _config
			},
			{
				isDev: true,
				isWatch: true,
				preparePackages: true
			}
		);

		await new Promise(() => {
			/* 开发服务永不 resolve */
		});
	}
}
