import { ParserManager } from './ParserManager';
import { SubParser } from './index';

export class Argparser extends ParserManager {
  private _actions: string[];
  private readonly _optionValueByName: Record<string, string | boolean>;

  constructor({ name, description }: { name: string; description: string }) {
    super({
      name: name,
      description: description
    });

    this._optionValueByName = {};
  }

  public parse(args?: string[]): void {
    if (!args) {
      args = process.argv.slice(2);
    }

    const actions: string[] = [];
    let i = 0;

    while (!Argparser.maybeOption(args[i])) {
      actions.push(args[i]);
      i++;
    }

    const action = this._validateAndReturnAction(actions);

    const optionArgs = args.slice(i);
    i = 0;

    while (i < optionArgs.length) {
      const arg = optionArgs[i];

      let result: RegExpExecArray;
      if ((result = Argparser.maybeEquationExec(arg))) {
        const _option = action.getOption(result.groups.name);
        // this._optionValueByName[_option.strippedName()] = result.groups.value;
        _option.value = result.groups.value;
        _option?.callback?.call(null, _option.value);

        i++;
        continue;
      }

      const nextArg = optionArgs[i + 1];
      const _option = action.getOption(arg);

      if (!_option) {
        throw new Error(`Unknown option [${arg}]`);
      }

      // todo 处理未知参数
      if (Argparser.maybeOption(arg) && !Argparser.maybeOption(nextArg)) {
        // this._optionValueByName[_option.strippedName()] = nextArg || true;
        _option.value = nextArg || true;
        _option?.callback?.call(null, _option.value);

        i += 2;
        continue;
      }

      if (Argparser.maybeOption(arg) && (Argparser.maybeOption(nextArg) || !arg)) {
        // this._optionValueByName[_option.strippedName()] = true;
        _option.value = true;
        _option?.callback?.call(null, _option.value);
      }

      i++;
    }

    action.callback(this.opts());
  }

  public opts<T>(): T {
    const action = this._validateAndReturnAction(this._actions);

    const options = action.options;
    const obj = {} as T;
    for (const option of options) {
      Object.defineProperty(obj, option.strippedName(), {
        configurable: false,
        enumerable: true,
        writable: false,
        value: option.value
      });
    }

    Object.defineProperty(obj, '_', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: this._actions
    });

    return obj;
  }

  private _validateAndReturnAction(actions: string[]): SubParser {
    let i = 0,
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      parent: ParserManager = this,
      child: ParserManager;
    while (actions[i] && (child = parent.findParser(actions[i]))) {
      parent = child;
      i++;
    }

    if (!child) {
      throw new Error(`Action <${actions[i]}> is not defined`);
    }

    this._actions = actions;

    return child;
  }

  public static maybeOption(input: string): boolean {
    return /^-{1,2}([\w_]+)$/.test(input);
  }

  public static maybeEquationExec(input: string): RegExpExecArray {
    return /^(?<name>-{1,2}[\w_]+)=(?<value>[\w_/]+)$/.exec(input);
  }
}
