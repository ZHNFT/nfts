import * as process from 'process';
import { CommandLineToolDefinition } from '@ntfs/command-line';
import { MonoPackageConfig } from '../base/MonoPackageConfig';
export class MonoPackages extends CommandLineToolDefinition {
    constructor() {
        super({
            toolName: 'mono-package',
            toolDescription: 'this is a mono-package description'
        });
        this._parser.defineParam({
            longName: '--list',
            shortName: '-l',
            summary: '列出所有被管理的包'
        });
        this._parser.defineParam({
            longName: '--config',
            summary: '指定mono-packages执行需要的配置'
        });
        this._config = new MonoPackageConfig();
        this._parser.exec(process.argv.slice(1).join(' '));
    }
    prepare() {
        this._readConfigFromCommandLine();
        return this;
    }
    exec() {
        return Promise.resolve();
    }
    _readConfigFromCommandLine() {
        const _configPath = this._parser.result.getValueByParamName('--config');
        if (_configPath) {
            // @todo 这里需要使用JsonSchema来验证指定的配置的文件格式是否正确
            this._config = new MonoPackageConfig(_configPath);
        }
    }
}
