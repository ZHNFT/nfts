import { CommandLine, Hooks } from '@ntfs/noddy';

import { BuildArg } from '../args/BuildArg';
import { DevArg } from '../args/DevArg';
import { IArgDefinition } from '../args/BaseArg';

export class Gmf extends CommandLine {
  constructor() {
    super({
      name: 'gmf',
      description: `这是一个简单的说明`
    });

    this._addHooksForPlugin();

    const argContext: IArgDefinition = {
      parser: this._parser,
      hooks: this._hook
    };

    this.addArg(new BuildArg(argContext));
    this.addArg(new DevArg(argContext));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(): Promise<void> {
    this._parser.parse(['gmf', 'test']);
  }

  prepare(): Gmf {
    // 解析参数数据；
    // 读取配置文件信息；
    return this;
  }

  private _addHooksForPlugin() {
    this._hook = new Hooks<IArgDefinition>();
    this._hook.addHook('build');
    this._hook.addHook('dev');
    this._hook.addHook('test');
    this._hook.addHook('preview');
    this._hook.addHook('publish');
  }
}
