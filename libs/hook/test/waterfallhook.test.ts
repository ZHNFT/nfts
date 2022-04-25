import { WaterfallHook } from '../src/hooks/WaterfallHook';

describe('WaterfallHook测试', () => {
	const waterfallHook = new WaterfallHook<{
		name: string;
		age: number;
		address?: string;
	}>();

	const initialTaskArgs = {
		name: 'ray',
		age: 12
	};

	waterfallHook.add('1', args => {
		return args;
	});

	waterfallHook.add('2', args => {
		return new Promise(resolve => {
			resolve({
				...args,
				address: 'chengdu'
			});
		});
	});

	waterfallHook.add('3', args => {
		return args;
	});

	waterfallHook.add('4', args => {
		return new Promise(resolve => {
			resolve({
				...args,
				address: (args.address ?? '') + '-shuangliu'
			});
		});
	});

	test('waterfall返回正确的参数', () => {
		return expect(waterfallHook.call(initialTaskArgs))
			.resolves.toStrictEqual({
				name: 'ray',
				age: 12,
				address: 'chengdu-shuangliu'
			})
			.then(args => {
				console.log('test finished');
			});
	});
});
