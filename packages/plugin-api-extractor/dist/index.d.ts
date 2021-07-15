import { ExtractorConfig } from '@microsoft/api-extractor';
import { IExtractorConfigPrepareOptions } from '@microsoft/api-extractor';
import type { PluginImpl } from 'rollup';

declare const apiExtractor: PluginImpl<ApiExtractorProps>;
export default apiExtractor;

declare type ApiExtractorProps = {
    mainEntryPointFilePath: string;
    clear?: boolean;
    cwd?: string;
    untrimmedFilePath?: string;
    betaTrimmedFilePath?: string;
    publicTrimmedFilePath?: string;
    overrides?: Partial<IExtractorConfigPrepareOptions>;
};

export declare const combine: (options?: ApiExtractorProps) => ApiExtractorProps;

export declare const createConfig: ({ mainEntryPointFilePath, cwd, overrides, untrimmedFilePath, }: ApiExtractorProps) => ExtractorConfig;

export { }
