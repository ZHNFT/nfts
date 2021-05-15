import type { PluginImpl } from "rollup";
import { resolve } from "path";
import { ExtractorConfig, Extractor } from "@microsoft/api-extractor";

/// TODO enhance those props
export type ApiExtractorProps = {
  mainEntryPointFilePath: string;
  clear?: boolean;
  cwd?: string;
};

let runBefore = false;

const combine = (
  options: ApiExtractorProps = { mainEntryPointFilePath: "./index.d.ts" }
): ApiExtractorProps => {
  const defaultOpts = {
    clear: false,
    cwd: process.cwd(),
  };

  return Object.assign(defaultOpts, options);
};

/// generate api-extractor configuration
const createConfig = (
  mainEntryPointFilePath: string,
  cwd: string
): ExtractorConfig => {
  return ExtractorConfig.prepare({
    configObjectFullPath: undefined,
    configObject: {
      mainEntryPointFilePath,
      compiler: {
        // skipLibCheck: true,
        overrideTsconfig: {},
      },
      projectFolder: cwd,
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: resolve(cwd, "dist/index.d.ts"),
        betaTrimmedFilePath: "",
        publicTrimmedFilePath: "",
        omitTrimmingComments: true,
      },
    },
    packageJsonFullPath: resolve(cwd, "package.json"),
  });
};

/// rollup plugin api-extractor
const apiExtractor: PluginImpl<ApiExtractorProps> = (props) => {
  return {
    name: "api-extractor",
    writeBundle() {
      props = combine(props);

      if (!runBefore) {
        console.log("Starting api-extractor process......");
        const result = Extractor.invoke(
          createConfig(props.mainEntryPointFilePath, props.cwd as string)
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
