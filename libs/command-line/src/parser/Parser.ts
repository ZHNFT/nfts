import { ParameterKinds } from '../parameters/ParameterDefinition';
import { ParameterString, ParameterArray, ParameterBool, ParameterDefinitionBase } from '../parameters/index';

export interface ArgsResult {
	_: string;
	[key: string]: string;
}

function isValidMark(mark: string): boolean {
	return /^[-]{1,2}\b/.test(mark);
}

export class Parser {
	private readonly _commandLineClassOptions: Map<string, ParameterDefinitionBase>;

	public commandName: string;

	constructor() {
		this._commandLineClassOptions = new Map();
	}

	public exec(commandLineOptions: string[]) {
		const res = {} as ArgsResult;
		let token: string;
		const _args = commandLineOptions.slice(0);
		let _lastMeetFlag: string | undefined;

		while ((token = _args[0])) {
			if (!_lastMeetFlag && !res._ && !isValidMark(token)) {
				res._ = token;
			}

			if (isValidMark(token)) {
				token = token.replace(/^[-]+/, '');

				if (_lastMeetFlag) {
					res[_lastMeetFlag] = '';
				}

				_lastMeetFlag = token;
			} else {
				if (_lastMeetFlag) {
					res[_lastMeetFlag] = token;
					_lastMeetFlag = undefined;
				}
			}

			_args.splice(0, 1);
		}
		// 将解析结果和Parameter进行匹配
		this._matchParameterWithParsedResult(res);
	}

	private _matchParameterWithParsedResult(result: ArgsResult) {
		const { _, ...trueCommandLineJsonOptions } = result;

		this.commandName = _;

		for (const optionName in trueCommandLineJsonOptions) {
			if (trueCommandLineJsonOptions.hasOwnProperty(optionName)) {
				const optionValue = trueCommandLineJsonOptions[optionName];
				const paramClass = this._commandLineClassOptions.get(optionName);
				if (!paramClass) {
					// todo Print Warning Message In Console
					console.warn(`Command Option '--${optionName}' is not register,
          please make sure you register it first;`);
				} else {
					if (paramClass.kind === ParameterKinds.boolean) {
						paramClass.setValue('true');
					} else {
						paramClass.setValue(optionValue);
					}
				}
			}
		}
	}

	public registerParameter(defineOpts: Omit<ParameterDefinitionBase, 'value' | '_value' | 'setValue'>) {
		let param: ParameterDefinitionBase;

		switch (defineOpts.kind) {
			case 'string':
				param = new ParameterString({
					name: defineOpts.name,
					shortName: defineOpts.shortName,
					required: defineOpts.required
				});
				break;
			case 'number':
				param = new ParameterString({
					name: defineOpts.name,
					shortName: defineOpts.shortName,
					required: defineOpts.required
				});
			case 'array':
				param = new ParameterArray({
					name: defineOpts.name,
					shortName: defineOpts.shortName,
					required: defineOpts.required
				});
				break;
			case 'boolean':
				param = new ParameterBool({
					name: defineOpts.name,
					shortName: defineOpts.shortName,
					required: defineOpts.required
				});
			default:
				break;
		}

		this._commandLineClassOptions.set(defineOpts.name, param);
	}

	public getParameters() {
		const params = {};

		for (const iter of this._commandLineClassOptions.values()) {
			params[iter.name] = iter.value;
		}

		return params;
	}
}
