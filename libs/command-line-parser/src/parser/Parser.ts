import {
  ParameterString,
  ParameterArray,
  ParameterBool,
  ParameterDefinitionBase
} from '../parameters';

export interface ArgsResult {
  _: string;
  [key: string]: string;
}

function isValidMark(mark: string): boolean {
  return /^[-]{1,2}\b/.test(mark);
}

export class Parser {
  private readonly _rawCommandLineOptions: string[];
  private readonly _commandLineClassOptions: Map<
    string,
    ParameterDefinitionBase
  >;

  constructor() {
    this._commandLineClassOptions = new Map();
    this._rawCommandLineOptions = process.argv;
    this._parse(this._rawCommandLineOptions.slice(2));
  }

  private _parse(commandLineOptions: string[]) {
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

    for (const optionName in trueCommandLineJsonOptions) {
      if (trueCommandLineJsonOptions.hasOwnProperty(optionName)) {
        const optionValue = trueCommandLineJsonOptions[optionName];
        const paramClass = this._commandLineClassOptions.get(optionName);
        // TODO 没有定义的参数被解析到
        if (!paramClass) {
          console.error(`Command Option '--${optionName}' is not register,
          please make sure you register it first;`);
        }

        paramClass.setValue(optionValue);
      }
    }
  }

  public registerParameter(
    defineOpts: Omit<ParameterDefinitionBase, 'value' | '_value' | 'setValue'>
  ) {
    let param: ParameterDefinitionBase;

    switch (defineOpts.kind) {
      case 'string':
        param = new ParameterString(
          defineOpts.name,
          defineOpts.shortName,
          defineOpts.required
        );
        break;
      case 'number':
        param = new ParameterString(
          defineOpts.name,
          defineOpts.shortName,
          defineOpts.required
        );
      case 'array':
        param = new ParameterArray(
          defineOpts.name,
          defineOpts.shortName,
          defineOpts.required
        );
        break;
      case 'boolean':
        param = new ParameterBool(
          defineOpts.name,
          defineOpts.shortName,
          defineOpts.required
        );
      default:
        break;
    }

    this._commandLineClassOptions.set(defineOpts.name, param);
  }
}
