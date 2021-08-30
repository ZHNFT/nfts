import { SyncHook } from 'tapable';

export class PluginContext {}

export class PluginMgmt {
  hook: SyncHook<PluginContext>;

  initializePlugins() {
    return this.hook;
  }
}

export class ActionBase {
  readonly #_name: string;
  readonly #_plugins: PluginMgmt;

  constructor({ name }: { name: string }) {
    this.#_name = name;

    this.#_plugins = new PluginMgmt();
  }

  get name(): string {
    return this.#_name;
  }

  get plugins() {
    return this.#_plugins;
  }
}

export class NodeCommandLine {
  // 名称
  toolName: string;
  // 描述
  toolDescription: string;

  // 命令行指令
  actions: ActionBase[];
  actionsByName: Record<string, ActionBase>;

  constructor({
    toolName,
    toolDescription
  }: {
    toolName: string;
    toolDescription: string;
  }) {
    this.toolName = toolName;
    this.toolDescription = toolDescription;
  }

  getActionByName(actionName: string): ActionBase | undefined {
    return this.actionsByName[actionName];
  }
}

type CLICommandNames = {
  _: string[];
};

type CLICommandOptions = Record<string, string | boolean>;

export type CLICommandParsedArgs = CLICommandNames & CLICommandOptions;

export const argsParser = <T extends CLICommandOptions>(
  args: string[]
): { _: string[] } & T => {
  const obj = Object.create(null);

  let option: string;
  let prevFlagName: string;

  obj._ = [] as string[];

  while ((option = args.shift())) {
    if (/^[-]{1,2}\w/.test(option)) {
      if (prevFlagName) {
        obj[prevFlagName] = true;
      }

      prevFlagName = option.startsWith('--')
        ? option.replace('--', '')
        : option.replace('-', '');
    } else {
      if (prevFlagName) {
        obj[prevFlagName] = option;
      } else {
        obj._.push(option);
      }

      prevFlagName = '';
    }
  }

  return obj;
};
