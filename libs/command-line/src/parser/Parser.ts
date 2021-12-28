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
  }

  public registerParameter(defineOpts: Omit<ParameterDefinitionBase, 'value' | '_value' | 'setValue'>) {
    let param: ParameterDefinitionBase;

    switch (defineOpts.kind) {
      default:
        break;
    }

    this._commandLineClassOptions.set(defineOpts.name, param);
  }

  public getParameters() {
    const params = {};

    for (const iter of this._commandLineClassOptions.values()) {
    }

    return params;
  }
}
