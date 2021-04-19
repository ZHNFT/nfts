/**
 * @microsoft/api-extractor binding with rollup
 */
import path from "path"
import { existsSync } from "fs"
import * as fs from "fs-extra"
import type {
  ExtractorResult,
  IExtractorInvokeOptions,
} from "@microsoft/api-extractor"
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor"

/**
 * @public
 */
export type RollupPluginApiExtractorOptions = {
  invokeOptions: IExtractorInvokeOptions
  cleanup: boolean
  configFile: string
  generateDist: string
  override: { [key: string]: unknown }
}

function runExtractor({
  configFile,
  generateDist,
  invokeOptions,
}: Partial<RollupPluginApiExtractorOptions>) {
  if (configFile) {
    console.log("")
    console.log("> rpae: generating .d.ts, using @microsoft/api-extractor")
    console.log("> rpae: using configuration from -> " + configFile)
    console.log("")
  }

  // Load and parse the api-extractor.json file
  const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(
    configFile as string
  )

  // Invoke API Extractor
  const extractorResult: ExtractorResult = Extractor.invoke(
    extractorConfig,
    invokeOptions
  )

  if (extractorResult.succeeded) {
    process.exitCode = 0
  } else {
    console.log(extractorResult.errorCount)
    process.exitCode = 1
  }
}

const isDev = process.env.NODE_ENV === "development"

const defaultConfigFile = [
  path.resolve(process.cwd(), "config/api-extractor.json"),
  path.resolve(process.cwd(), "api-extractor.json"),
].filter(existsSync)[0]

const defaultGenerateDist = path.resolve(process.cwd(), "dist")

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
export default function ({
  configFile = defaultConfigFile,
  cleanup = false,
  invokeOptions = {
    localBuild: isDev,
    showVerboseMessages: isDev,
  },
  generateDist = defaultGenerateDist,
  override = {},
}: Partial<RollupPluginApiExtractorOptions> = {}): any {
  return {
    name: "api-extractor",
    writeBundle: () => {
      if (cleanup) {
        fs.rmdirSync(
          path.isAbsolute(generateDist)
            ? generateDist
            : path.resolve(process.cwd(), generateDist)
        )
      }

      runExtractor({ configFile, invokeOptions, generateDist, override })
    },
  }
}

// `API Extractor completed successfully`)
// `API Extractor completed with ${extractorResult.errorCount} errors` +
//       ` and ${extractorResult.warningCount} warnings`
