import {
	SubParser,
	IParserOptionDefinition,
	TOption,
	StringOption,
	ParserOptionAbstract
} from '@ntfs/argparser';
import Parameters from './Parameters';

export interface IActionInitOptions {
	actionName: string;
	actionDescription: string;
}

export default abstract class Action extends Parameters {
	private readonly _subParser: SubParser;

	constructor(options: IActionInitOptions) {
		super();
		this._subParser = new SubParser({
			name: options.actionName,
			description: options.actionDescription
		});

		this.onParameterDefinition();
	}

	public get actionName(): string {
		return this._subParser.name;
	}

	public get actionParser(): SubParser {
		return this._subParser;
	}

	/**
	 * 添加参数
	 * @param definition
	 * @returns
	 */
	private _addParameter(definition: IParserOptionDefinition): TOption {
		const param = this._subParser.addOption(definition);
		super.addParameter(param);
		return param;
	}

	/**
	 * 抽象方法；
	 * 用于注册命令行参数；
	 * @abstract
	 */
	abstract onParameterDefinition(): void;
	/**
	 * 执行逻辑；
	 * @abstract
	 */
	abstract onExecute(): Promise<void>;

	public stringParameter(definition: Omit<IParserOptionDefinition, 'type'>): TOption {
		return this._addParameter({
			...definition,
			type: 'String'
		});
	}

	public flagParameter(definition: Omit<IParserOptionDefinition, 'type'>): TOption {
		return this._addParameter({
			...definition,
			type: 'Flag'
		});
	}

	public choisesParameter(definition: Omit<IParserOptionDefinition, 'type'>): TOption {
		return this._addParameter({
			...definition,
			type: 'Choices'
		});
	}
}
