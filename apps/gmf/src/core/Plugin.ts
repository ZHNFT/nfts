import { BuildCycle, PreviewCycle, TestCycle } from '../lifecycle';
import Config from './Config';
import { createRequire } from 'module';
import { resolve } from 'path';

export const loadModule = <T>(name: string): T => {
	const req = createRequire(resolve(process.cwd(), 'node_modules'));
	return req(name) as T;
};

/*
 * todo
 *  钩子函数的参数
 * */
export interface CommandLifecycleContext {
	mock: string;
}

/*
 *  插件实例化需要的参数
 * */
export interface PluginContext {
	config: Config;
	hook: {
		build: BuildCycle;
		preview: PreviewCycle;
		test: TestCycle;
	};
}

export abstract class Plugin {
	/*
	 * @remark
	 *   插件名称
	 * */
	abstract name: string;
	/*
	 *  @remark
	 *   插件说明
	 * */
	abstract summary: string;
	/*
	 * @remark
	 *   插件实现逻辑
	 * */
	abstract apply: (ctx: PluginContext) => void | Promise<void>;
}
