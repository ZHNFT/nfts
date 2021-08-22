import { GmfPlugin } from './GmfPlugin';
import { GmfAction } from './GmfAction';
export declare class GmfConfiguration {
    #private;
    plugins: GmfPlugin[];
    actions: GmfAction[];
    constructor({ name, description }: {
        name: string;
        description: string;
    });
    /**
     * @param cwd
     * @description 访问配置文件
     */
    lookup({ cwd, configPath }: {
        cwd: string;
        configPath: string;
    }): void;
}
