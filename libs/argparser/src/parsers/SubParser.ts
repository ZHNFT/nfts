import { Execution } from "@nfts/node-utils-library";
import { TParameter } from "../parameters";
import { Utils } from "../utils/Utils";

export class SubParser<R = unknown> {
  public readonly name: string;
  public readonly description: string;

  private _parent?: SubParser<R>;
  private _child: Set<SubParser<R>> = new Set<SubParser<R>>();
  private _parameters: Set<TParameter> = new Set<TParameter>();
  private _flagCallbacks: Set<Execution.TaskFunc<R>> = new Set<
    Execution.TaskFunc<R>
  >();

  private _executeFile?: string;

  constructor(action: string, description: string) {
    this.name = action;
    this.description = description;
  }

  public addSubParser(parser: SubParser<R>): SubParser<R> {
    parser._parent = this;
    this._child.add(parser);
    return this;
  }

  public addParam(param: TParameter) {
    this._parameters.add(param);
    return this;
  }

  public parse(args?: string[]): R {
    if (!Array.isArray(args)) {
      args = process.argv.slice(1);
    }

    this._executeFile = args.shift();
    return this._parse(args);
  }

  private _parse(args: string[]): R {
    this._flagCallbacks.clear();

    const _actions: string[] = [];
    let i = 0;

    // extract actions
    while (args[i] && !Utils.hasParamFlagPrefix(args[i])) {
      _actions.push(args[i]);
      i++;
    }

    args = args.slice(i);

    //
    const _rootParser = this._findRootParser();
    const _activeParser = Utils.findActiveParser(
      _rootParser as SubParser<unknown>,
      _actions
    );

    this._appendRootParamsToActiveParser(
      _rootParser as SubParser<unknown>,
      _activeParser as SubParser<unknown>
    );

    const _result = args.reduce(
      (prevResult, currentArg, currentIndex, _args) => {
        let _key: string, _value: string | boolean;

        if (Utils.hasParamFlagPrefix(currentArg)) {
          const stripParamFlagName = Utils.stripParamFlagPrefix(currentArg);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          prevResult[stripParamFlagName] = true;
          _key = currentArg;
          _value = true;
        } else {
          const prevArg = _args[currentIndex - 1];
          const prevStripParamFlagName = Utils.stripParamFlagPrefix(prevArg);
          if (prevStripParamFlagName in prevResult) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            prevResult[prevStripParamFlagName] = currentArg;
            _key = prevArg;
            _value = currentArg;
          }
        }

        const param = Utils.applyParameterValue(_activeParser, _key!, _value!);

        // Add shortName to result
        if (param?.shortName) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          prevResult[Utils.stripParamFlagPrefix(param.shortName)] = _value;
        }

        if (param?.name) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          prevResult[Utils.stripParamFlagPrefix(param.name)] = _value;
        }

        if (param?.callback) {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          this._flagCallbacks.add(param.callback);
        }
        return prevResult;
      },
      {}
    ) as R;

    this._executeFlagCallback(_result);

    /**
     * append sub command
     * */
    Object.defineProperty(_result, "_", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: _actions.slice(0),
    });

    return _result;
  }

  /**
   * 返回当前parser的所有子parser
   */
  public getAllParsers(): Readonly<SubParser<R>[]> {
    return Array.from(this._child.values());
  }

  /**
   * 返回parser上定义的所有parameter
   */
  public getAllParameters(): Readonly<TParameter[]> {
    return Array.from(this._parameters.values());
  }

  public findSubParser(name: string): SubParser<R> | undefined {
    for (const subParser of this._child.values()) {
      if (subParser.name === name) {
        return subParser;
      }
    }
  }

  public findParameter(name: string): TParameter | undefined {
    for (const param of this._parameters.values()) {
      if (param.name === name || param.shortName === name) {
        return param;
      }
    }
  }

  public _findRootParser(): SubParser<R> {
    if (!this._parent) {
      return this;
    }
    let _parent = this._parent;
    while (_parent && _parent._parent) {
      _parent = _parent._parent;
    }
    return _parent;
  }

  // TODO Make it async
  private _executeFlagCallback(result: R) {
    const callbacks = Array.from(this._flagCallbacks.values());
    void Execution.serialize<R>(callbacks, result);
  }

  private _appendRootParamsToActiveParser(root: SubParser, active: SubParser) {
    const _params = Array.from(root._parameters.values());
    _params.forEach((param) => {
      active.addParam(param);
    });
  }
}
