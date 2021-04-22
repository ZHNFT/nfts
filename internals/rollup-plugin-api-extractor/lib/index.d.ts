import type { IExtractorInvokeOptions } from "@microsoft/api-extractor";
/**
 * @public
 */
export declare type RollupPluginApiExtractorOptions = {
    invokeOptions?: IExtractorInvokeOptions;
    cleanup?: boolean;
    configFile?: string;
    generateDist?: string;
    override?: {
        [key: string]: unknown;
    };
    cwd?: string;
};
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
export default function plugin({ configFile, cleanup, invokeOptions, generateDist, override, cwd, }?: RollupPluginApiExtractorOptions): any;
