import { CommandLine } from '@ntfs/noddy';

import { BuildArg } from '../args/BuildArg';
import { DevArg } from '../args/DevArg';
import { IArgDefinition } from '../args/BaseArg';

export class Gmf extends CommandLine {
  constructor() {
    super({
      name: 'gmf',
      description: `这是一个简单的说明`
    });

    const argContext: IArgDefinition = {
      parser: this._parser
    };

    this.addArg(new BuildArg(argContext));
    this.addArg(new DevArg(argContext));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(): Promise<void> {
    this._parser.parse(['gmf', 'amg']);
  }

  prepare(): Gmf {
    // 解析参数数据；
    // 读取配置文件信息；
    return this;
  }
}
