import type {
  PluginImpl,
  OutputOptions,
  OutputChunk,
  OutputAsset,
} from "rollup";
import { resolve, isAbsolute, dirname } from "path";
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";

export type ApiExtractorProps = {
  declarationDir: string;
  clear?: boolean;
};

let runBefore = false;

const combine = (
  options: ApiExtractorProps = { declarationDir: "" }
): ApiExtractorProps => {
  const defaultOpts = {
    clear: false,
  };

  return Object.assign(defaultOpts, options);
};

/// generate api-extractor configuration
const createConfig = (entry, declarationDir) => {
  return {};
};

/// rollup plugin api-extractor
const apiExtractor: PluginImpl<ApiExtractorProps> = (props) => {
  return {
    name: "api-extractor",
    writeBundle(
      options: OutputOptions,
      bundle: { [fileName: string]: OutputAsset | OutputChunk }
    ) {
      props = combine(props);

      if (!runBefore) {
        if (!isAbsolute(props.declarationDir)) {
          props.declarationDir = dirname(props.declarationDir);
        }
      }

      runBefore = true;
    },
  };
};

export default apiExtractor;
