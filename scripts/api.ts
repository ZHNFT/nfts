import * as path from "path"
import {
  Extractor,
  ExtractorConfig,
  ExtractorResult,
} from "@microsoft/api-extractor"
import minimist from "minimist"

/**
 * ts-node --workspace=internals --pack=enviroment
 */

const { workspace, pack } = minimist<{ package: string }>(
  process.argv.slice(2)
)

const apiExtractorJsonPath: string = path.join(
  __dirname,
  "..",
  workspace,
  pack,
  "api-extractor.json"
)

// Load and parse the api-extractor.json file
const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(
  apiExtractorJsonPath
)

// Invoke API Extractor
const extractorResult: ExtractorResult = Extractor.invoke(
  extractorConfig,
  {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,

    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true,
  }
)

if (extractorResult.succeeded) {
  console.log(`API Extractor completed successfully`)
  process.exitCode = 0
} else {
  console.error(
    `API Extractor completed with ${extractorResult.errorCount} errors` +
      ` and ${extractorResult.warningCount} warnings`
  )
  process.exitCode = 1
}
