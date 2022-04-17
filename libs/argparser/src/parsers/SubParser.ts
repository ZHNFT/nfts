import { TParameter } from '../parameters';
import { Utils } from '../utils/Utils';
import { Async } from '@nfts/node-utils-library';

type TFlagCallback<T = unknown> = (arg: T) => void;

export class SubParser {
  public readonly name: string;
  public readonly description: string;

  private _parent: SubParser;
  private _childs: Set<SubParser> = new Set<SubParser>();
  private _parameters: Set<TParameter> = new Set<TParameter>();
  private _flagCallbacks: Set<TFlagCallback> = new Set<TFlagCallback>();

  private _executeFile: string;

  constructor(action: string, description: string) {
    this.name = action;
    this.description = description;
  }

  public addSubParser(parser: SubParser): SubParser {
    parser._parent = this;
    this._childs.add(parser);
    return this;
  }

  public addParam(param: TParameter) {
    this._parameters.add(param);
    return this;
  }

  public parse<R = unknown>(args?: string[]): R {
    if (!Array.isArray(args)) {
      args = process.argv.slice(1);
    }

    this._executeFile = args.shift();
    return this._parse(args);
  }

  private _parse<R = unknown>(args: string[]): R {
    this._flagCallbacks.clear();

    let _actions: string[] = [];
    let i = 0;

    // extract actions
    while (args[i] && !Utils.hasParamFlagPrefix(args[i])) {
      _actions.push(args[i]);
      i++;
    }

    args = args.slice(i);

    //
    const _rootParser = this._findRootParser();
    const _activeParser = Utils.findActiveParser(_rootParser, _actions);

    this._appendRootParamsToActiveParser(_rootParser, _activeParser);

    const _result = args.reduce((prevResult, currentArg, currentIndex, _args) => {
      let _key, _value;

      if (Utils.hasParamFlagPrefix(currentArg)) {
        let stripParamFlagName = Utils.stripParamFlagPrefix(currentArg);
        prevResult[stripParamFlagName] = true;
        _key = currentArg;
        _value = true;
      } else {
        const prevArg = _args[currentIndex - 1];
        const prevStripParamFlagName = Utils.stripParamFlagPrefix(prevArg);
        if (prevStripParamFlagName in prevResult) {
          prevResult[prevStripParamFlagName] = currentArg;
          _key = prevArg;
          _value = currentArg;
        }
      }

      const param = Utils.applyParameterValue(_activeParser, _key, _value);

      // Add shortName to result
      if (param.shortName) {
        prevResult[Utils.stripParamFlagPrefix(param.shortName)] = _value;
      }

      if (param.name) {
        prevResult[Utils.stripParamFlagPrefix(param.name)] = _value;
      }

      if (param.callback) {
        this._flagCallbacks.add(param.callback);
      }

      return prevResult;
    }, {}) as R;
    this._executeFlagCallback<R>(_result);

    /**
     * append sub command
     * */
    Object.defineProperty(_result, '_', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: _actions.slice(0)
    });

    return _result;
  }

  public findSubParser(name: string): SubParser {
    for (const subParser of this._childs.values()) {
      if (subParser.name === name) {
        return subParser;
      }
    }
  }

  public findParameter(name: string): TParameter {
    for (const param of this._parameters.values()) {
      if (param.name === name || param.shortName === name) {
        return param;
      }
    }
  }

  private _findRootParser(): SubParser {
    if (!this._parent) {
      return this;
    }
    let _parent = this._parent;
    while (_parent) {
      _parent = _parent._parent;
    }
    return _parent;
  }

  private _executeFlagCallback<R>(result: R) {
    const callbacks = Array.from(this._flagCallbacks.values());
    void Async.serialize<R>(callbacks, result);
  }

  private _appendRootParamsToActiveParser(root: SubParser, active: SubParser) {
    const _params = Array.from(root._parameters.values());
    _params.forEach(param => {
      active.addParam(param);
    });
  }
}
