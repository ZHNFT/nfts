import chalk from "chalk"
import { spawnSync } from "child_process"
import * as fs from "fs"
import minimist from "minimist"
import { resolve } from "path"
import { findConfigFile } from "typescript"

const rootPath = process.cwd()

const { pack } = minimist<{ pack: string }>(
  process.argv.slice(2)
)

function exit(code: number, message: string = "") {
  console.error(message)
  process.exit(code)
}

const command = "tsc"

const [fileConfig, ..._ignoredFileconfigs] = [
  findConfigFile(resolve(rootPath, pack), fs.existsSync), // search local package root
  findConfigFile(rootPath, fs.existsSync), // search project root
].filter(Boolean)

if (fileConfig === undefined) {
  console.error(
    chalk.red("> no typescript configuration find")
  )
  exit(24, "     please varify your code")
}

console.log(`> compile with configuration, ${fileConfig}`)

const { status } = spawnSync(
  command,
  ["--project", fileConfig as string],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  }
)

if (status !== 0) {
  exit(24, chalk.red("> build error"))
} else {
  console.log(chalk.green("> build success"))
  console.log("")
}
