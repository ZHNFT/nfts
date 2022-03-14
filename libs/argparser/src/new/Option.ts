export enum OptionTypes {
	Flag = 'Flag', // true/false
	Int = 'Int', // integer
	Float = 'Float', // float
	String = 'String', // String
	Choices = 'Choices', //
	Array = 'Array' // 可以声明多个option，来完成一个数组的交互，数组成员统一转换成字符串；
}

export type TOptionTypes = keyof typeof OptionTypes;

export interface IParserOptionDefinition {
	name: string;
	/*
	 * 可以设置option的别名，一个或者多个；
	 * 通常别名只有一个字母：-x
	 * */
	alias?: string | string[];
	usage?: string;
	type?: TOptionTypes;
	/*
	 * 在type=Choices的情况下的待选项；
	 * */
	alternatives?: string[];
	required?: boolean;
}

export abstract class ParserOptionImpl implements IParserOptionDefinition {
	readonly name: string;
	/*
	 * 可以设置option的别名，一个或者多个；
	 * 通常别名只有一个字母：-x
	 * */
	readonly alias?: string | string[];
	readonly usage?: string;
	readonly type?: TOptionTypes;
	/*
	 * 在type=Choices的情况下的待选项；
	 * */
	readonly alternatives?: string[];

	readonly required?: boolean;

	constructor(definition: IParserOptionDefinition) {
		this.name = definition.name;
		this.usage = definition.usage;
		this.alias = definition.alias;
		this.alternatives = definition.alternatives;
		this.type = definition.type;
		this.required = definition.required;
	}

	/*
	 * 校验value值是否符合定义
	 * */
	abstract validate(value: unknown): void;
}
