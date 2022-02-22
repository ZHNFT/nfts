import { Argument } from '@ntfs/noddy';
import { IArgDefinition } from './BaseArg';

export class BuildArg extends Argument {
  constructor({ parser }: IArgDefinition) {
    super({
      name: 'build',
      description: '项目构建',
      parser
    });
  }

  exec(): void {
    console.log('Build you app');
  }
}
