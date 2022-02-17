import { Option } from './Option';
import { Command } from './Command';

export class Action {
  private readonly _name: string;
  private readonly _description: string;
  private _opts: Option[] = [];
  private _command: Command;
  private _callback: (arg: any) => void;
  private readonly _optsWithValueByName: Record<string, any>;

  constructor({ name, description }: { name: string; description: string }) {
    this._name = name;
    this._description = description;

    this._optsWithValueByName = {};
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  addOption(option: { name: string; description: string }): Action {
    const _opt = new Option(option);
    this._opts.push(_opt);
    this._onActionOption(option.name);
    return this;
  }

  _findOption(name: string): Option | undefined {
    return this._opts.find(opt => opt.name === name);
  }

  /** 绑定操作到某个命令上 */
  public bindTo(cmd: Command): Action {
    if (!this._command) {
      this._command = cmd;
      this._onCommandAction();
      return this;
    }

    return this;
  }

  public addCallback(callback: (arg: any) => void): Action {
    this._callback = callback;
    this._onCommandAction();
    return this;
  }

  /* 监听从顶层下发的操作 */
  private _onCommandAction() {
    if (!this._command || !this._callback) return;
    this._command.on(`action:${this._name}`, this._callback);
  }

  private _onActionOption(optionName: string): void {
    if (!this._command) return;

    this._command.on(`option:${this._name}:${optionName}`, (value: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this._optsWithValueByName[optionName] = value;
    });
  }
}
