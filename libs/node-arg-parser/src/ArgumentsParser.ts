import { ArgumentsParserResult } from './ArgumentsParserResult';

export type TGoodParameterValueTypes = string | string[] | boolean | number;

export enum ArgumentParamKind {
	String = 'String',
	Bool = 'Bool',
	Array = 'Array',
	Number = 'Number'
}

export type TArgumentParamKind = keyof typeof ArgumentParamKind;

enum TokenKind {
	CommandFlag = 'CommandFlag',
	ShortNameFlag = 'ShortNameFlag',
	LongNameFlag = 'LongNameFlag',
	ValueFlag = 'ValueFlag',

	// preserved
	EolFlag = 'EolFlag',
	SpaceFlag = 'SpaceFlag'
}

type TTokenKind = keyof typeof TokenKind;

type Token = {
	pos: {
		start: number;
		end: number;
	};
	buffer: string;
	kind: TTokenKind;
};

export interface IArgumentParam {
	name: string;
	summary?: string;
	required?: boolean;
	kind?: TArgumentParamKind;
}

export enum StepType {
	BeforeExec = 'BeforeExec',
	AfterExec = 'AfterExec'
}

export class ArgumentsParser {
	/**
	 * 长参数名校验正则
	 * @type {RegExp}
	 */
	static argLongNameRegex: RegExp = /^\w/;
	/**
	 * 短参数名校验正则
	 * @type {RegExp}
	 */
	static argShortNameRegex: RegExp = /^\w/;
	/**
	 * 缓存defineParam设置的参数配置；
	 * @type {Map<string, IArgumentParam>}
	 */
	private _definedParams: Map<string, IArgumentParam>;

	/**
	 * 解析错误
	 * @type {ArgumentsParserError[]}
	 */
	// _errors: ArgumentsParserError[];
	/**
	 * 解析结果
	 * @type {ArgumentsParserResult}
	 */
	_result: ArgumentsParserResult;

	private _executed: boolean = false;

	public constructor() {
		this._result = new ArgumentsParserResult();
	}

	/**
	 * 缓存定义的参数配置
	 */
	public defineParam(param: IArgumentParam): void {
		this._processVerify(StepType.BeforeExec);
		this._definedParams.set(param.name, param);
	}

	/**
	 * 获取参数值
	 * @param paramName
	 */
	public getParamValue(paramName: string): TGoodParameterValueTypes {
		this._processVerify(StepType.AfterExec);
		const strParamValue = this._result.getParamValueByName(paramName);

		const paramDefine = this._definedParams.get(paramName);

		if (!paramDefine) {
			console.error(`parameter: ${paramName} is not defined`);
			return undefined;
		}

		const { kind } = paramDefine;

		return ArgumentsParser._transValueByKind(kind, strParamValue);
	}

	/**
	 * 获取command
	 */
	public getCommand(): string {
		this._processVerify(StepType.AfterExec);
		return this._result.command;
	}

	/**
	 * 获取子命令集合
	 */
	public getSubCommands(): string[] {
		this._processVerify(StepType.AfterExec);
		return Array.from(this._result.subCommands);
	}

	/**
	 * 通过kind，将数据转换称需要的类型，默认是string
	 * @param kind
	 * @param str
	 * @private
	 */
	private static _transValueByKind(kind: TArgumentParamKind, str: string | undefined): TGoodParameterValueTypes {
		switch (kind) {
			case ArgumentParamKind.Array:
				return str.split(',');
			case ArgumentParamKind.Bool:
				return Boolean(str);
			case ArgumentParamKind.Number:
				return Number(str);
			case ArgumentParamKind.String:
				return str;
		}
	}

	/**
	 * 将参数解析成Token形式
	 * @return {void}
	 */
	exec(args: string): ArgumentsParserResult {
		const tokens: Token[] = [];

		let strBuf: string;
		let start = 0;
		let end = 0;

		let prevToken: Token;

		const STOP_WHILE_LOOP_INDICATOR = '\\s{1,}';
		const END_OF_WHILE_LOOP_LENGTH = args.trim().length;

		while (end < END_OF_WHILE_LOOP_LENGTH) {
			const walkIndexStr = args.slice(end, end + 1);

			if (new RegExp(STOP_WHILE_LOOP_INDICATOR).test(walkIndexStr)) {
				strBuf = args.slice(start, end);

				if (/\s/.exec(strBuf)) {
					start++;
					end++;
					continue;
				}

				const token: Token = {
					pos: { start, end },
					buffer: strBuf,
					kind: this._tokenKind(strBuf, { start, end }, prevToken)
				};

				tokens.push(token);
				prevToken = token;
				start = end + 1;
			}
			end++;
		}

		this._getParamsFromTokens(tokens);

		this._executed = true;

		return this._result;
	}

	private _getParamsFromTokens(tokens: Token[]) {
		for (let i = 0; i < tokens.length; i++) {
			const _token = tokens[i];

			/**
			 * 假设NameFlag Token的下一个Token时ValueFlag Token；
			 * 如果是的话，直接设置为当前NameFlag的值写入result；
			 * 如果不是，那就是一个独立的Flag，默认为undefined，设置选项可以将其设置成true；
			 */
			const _nextMaybeValueToken = tokens[i + 1];

			switch (_token.kind) {
				case TokenKind.CommandFlag:
					i === 0 && this._result.setCommand(_token.buffer);
					i !== 0 && this._result.addSubCommands(_token.buffer);
					break;
				case TokenKind.LongNameFlag:
				case TokenKind.ShortNameFlag:
					this._result.setParamValueByName(
						_token.buffer,
						_nextMaybeValueToken.kind === TokenKind.ValueFlag ? _nextMaybeValueToken.buffer : undefined
					);
					break;
			}
		}
	}

	private _tokenKind(str: string, pos: Token['pos'], prevToken: Token | undefined): TTokenKind {
		if (ArgumentsParser.argLongNameRegex.test(str)) {
			return TokenKind.LongNameFlag;
		}

		if (ArgumentsParser.argShortNameRegex.test(str)) {
			return TokenKind.ShortNameFlag;
		}

		if (!this._result.command && pos.start === 0 && pos.end !== 0) {
			return TokenKind.CommandFlag;
		}

		if (prevToken.kind === TokenKind.LongNameFlag || prevToken.kind === TokenKind.ShortNameFlag) {
			return TokenKind.ValueFlag;
		}

		return null;
	}

	private _processVerify(ensureStep: keyof typeof StepType) {
		if (
			(ensureStep === StepType.BeforeExec && this._executed) ||
			(ensureStep === StepType.AfterExec && !this._executed)
		) {
			throw Error(`Wrong Execution Timing:`);
		}
	}
}
