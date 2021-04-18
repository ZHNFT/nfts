/**
 * microsoft/api-extractor binding with rollup
 */
import * as path from "path"
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor"
import type {
  ExtractorResult,
  IExtractorInvokeOptions,
} from "@microsoft/api-extractor"

export type RollupPluginApiExtractorOptions = {
  invokeOptions: IExtractorInvokeOptions
  cleanup?: boolean
  configFile?: string
}

function runExtractor({}) {
  // Load and parse the api-extractor.json file
  const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(
    apiExtractorJsonPath
  )

  // Invoke API Extractor
  const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,
    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true,
  })

  if (extractorResult.succeeded) {
    process.exitCode = 0
  } else {
    process.exitCode = 1
  }
}

const apiExtractorJsonPath: string = path.join(
  __dirname,
  "../config/api-extractor.json"
)

export default function ({
  configFile = "",
  cleanup = true,
  invokeOptions = {
    localBuild: true,
    showVerboseMessages: true,
  },
}: Partial<RollupPluginApiExtractorOptions> = {}): any {}

// `API Extractor completed successfully`)
// `API Extractor completed with ${extractorResult.errorCount} errors` +
//       ` and ${extractorResult.warningCount} warnings`
