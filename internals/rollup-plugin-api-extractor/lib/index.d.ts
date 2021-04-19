import type { IExtractorInvokeOptions } from '@microsoft/api-extractor';

/**
 *
 * @param configFile
 * @param cleanup
 * @param invokeOptions
 * @param generateDist
 * @param override
 *
 * @public
 */
declare function ({ configFile, cleanup, invokeOptions, generateDist, override, }?: Partial<RollupPluginApiExtractorOptions>): any;
export default default_2;

/**
 * @public
 */
export declare type RollupPluginApiExtractorOptions = {
    invokeOptions: IExtractorInvokeOptions;
    cleanup: boolean;
    configFile: string;
    generateDist: string;
    override: {
        [key: string]: unknown;
    };
};

export { }
