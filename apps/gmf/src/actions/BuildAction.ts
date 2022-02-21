import { CommandAction } from '@ntfs/noddy';

// 构建操作
export class BuildAction extends CommandAction {
  constructor() {
    super({
      name: 'build',
      description: 'Build that shit'
    });
  }

  apply(args: any[]): void {
    console.log(args);
  }

  onDefineOptions(): void {
    super.addOption({
      name: '--config',
      description: '设置配置文件的地址，默认是/config/gmf.json'
    });
  }
}
