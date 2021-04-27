/**
 * @microsoft/api-extractor binding with rollup
 */
import path from "path"
import { existsSync } from "fs"
import type {
  ExtractorResult,
  IExtractorInvokeOptions,
} from "@microsoft/api-extractor"
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor"

/**
 * @public
 */
export type RollupPluginApiExtractorOptions = {
  invokeOptions?: IExtractorInvokeOptions
  cleanup?: boolean
  configFile?: string
  generateDist?: string
  override?: { [key: string]: unknown }
  cwd?: string
}

function runExtractor({
  cwd,
  // override,
  configFile,
  // generateDist,
  invokeOptions,
}: Partial<RollupPluginApiExtractorOptions>) {
  let extractorConfig: ExtractorConfig

  // read local config file
  const localConfigFile = [
    path.resolve(cwd as string, "config/api-extractor.json"),
    path.resolve(cwd as string, "api-extractor.json"),
  ].filter(existsSync)[0]

  console.log(
    "> rpae: prepare to generating .d.ts, using @microsoft/api-extractor"
  )

  if (configFile) {
    console.log("")
    console.log("> rpae: using configuration from -> " + configFile)
    console.log("")

    // Load and parse the api-extractor.json file
    extractorConfig = ExtractorConfig.loadFileAndPrepare(configFile)
  } else {
    console.log("> rpae: generating config file...")
    console.log("")

    if (localConfigFile) {
      extractorConfig = ExtractorConfig.loadFileAndPrepare(localConfigFile)
    } else {
      extractorConfig = ExtractorConfig.prepare({
        configObject: {
          compiler: {
            tsconfigFilePath: path.resolve(cwd as string, "tsconfig.json"),
            overrideTsconfig: {},
          },
          projectFolder: cwd,
          mainEntryPointFilePath: path.resolve(cwd as string, "lib/index.d.ts"),
          dtsRollup: {
            enabled: true,
            untrimmedFilePath: path.resolve(cwd as string, "dist/index.d.ts"),
          },
          docModel: {
            enabled: false,
          },
          apiReport: {
            enabled: false,
          },
          tsdocMetadata: {
            enabled: false,
          },
        },
        packageJsonFullPath: path.resolve(cwd as string, "package.json"),
        configObjectFullPath: undefined,
      })
    }
  }

  // Invoke API Extractor
  const extractorResult: ExtractorResult = Extractor.invoke(
    extractorConfig,
    invokeOptions
  )

  if (extractorResult.succeeded) {
    process.exitCode = 0
  } else {
    if (extractorResult.errorCount) {
      console.log("")
      console.log(
        `> rpae: ${extractorResult.errorCount} errors counted durin api extractor`
      )
      process.exitCode = 1
    }
  }
}

const isDev = process.env.NODE_ENV === "development"

let haveRun = false

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
export default function plugin({
  configFile,
  cleanup = false,
  invokeOptions = {
    localBuild: isDev,
    showVerboseMessages: isDev,
  },
  generateDist,
  override = {},
  cwd = process.cwd(),
}: RollupPluginApiExtractorOptions = {}): any {
  return {
    name: "api-extractor",
    writeBundle: () => {
      if (!haveRun) {
        if (cleanup) {
          // cleanup dist folder
        }
        runExtractor({ configFile, invokeOptions, generateDist, override, cwd })
        haveRun = true
      }
    },
  }
}
