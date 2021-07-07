import type { PluginImpl } from "rollup";
import { resolve } from "path";
import {
	ExtractorConfig,
	Extractor,
	IExtractorConfigPrepareOptions,
} from "@microsoft/api-extractor";

export type ApiExtractorProps = {
	mainEntryPointFilePath: string;
	clear?: boolean;
	cwd?: string;
	overrides?: Partial<IExtractorConfigPrepareOptions>;
};

let runBefore = false;

const defaultOpts: Partial<ApiExtractorProps> = {
	clear: false,
	cwd: process.cwd(),
};

const combine = (
	options: ApiExtractorProps = { mainEntryPointFilePath: "./index.d.ts" }
): ApiExtractorProps => {
	return Object.assign({}, defaultOpts, options);
};

/// generate api-extractor configuration
const createConfig = (
	mainEntryPointFilePath: string,
	cwd: string,
	overrides: Partial<IExtractorConfigPrepareOptions> = {}
): ExtractorConfig =>
	ExtractorConfig.prepare({
		configObjectFullPath: undefined,
		configObject: {
			mainEntryPointFilePath,
			compiler: {
				overrideTsconfig: {},
			},
			projectFolder: cwd,
			dtsRollup: {
				enabled: true,
				untrimmedFilePath: resolve(cwd, "dist/index.d.ts"),
				betaTrimmedFilePath: resolve(cwd, "dist/index.beta.d.ts"),
				publicTrimmedFilePath: resolve(cwd, "dist/index.public.d.ts"),
				omitTrimmingComments: true,
			},
		},
		packageJsonFullPath: resolve(cwd, "package.json"),
		...overrides,
	});

/// rollup plugin api-extractor
const apiExtractor: PluginImpl<ApiExtractorProps> = (props) => {
	return {
		name: "api-extractor",
		writeBundle() {
			props = combine(props);

			if (!runBefore) {
				console.log("");
				console.log("Starting api-extractor process...");
				const result = Extractor.invoke(
					createConfig(
						props.mainEntryPointFilePath,
						props.cwd as string,
						props.overrides
					)
				);
				if (result.succeeded) {
					console.log("api-extractor succeeded");
				} else {
					console.error(
						`api-extractor finished with ${result.errorCount} errors, and ${result.warningCount} warnings`
					);
				}

				console.log("");
				runBefore = true;
			}
		},
	};
};

export default apiExtractor;
