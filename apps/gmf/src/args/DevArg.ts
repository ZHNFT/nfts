import { Argument } from '@ntfs/noddy';
import { IArgDefinition } from './BaseArg';

export class DevArg extends Argument {
  constructor({ parser }: IArgDefinition) {
    super({
      name: 'dev',
      description: '本地运行构建',
      parser
    });
  }

  exec(): void {
    console.log('Dev you app in local');
  }
}
