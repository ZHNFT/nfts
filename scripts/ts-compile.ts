import { resolve, relative } from "path"
import * as fs from "fs"
import { spawnSync } from "child_process"
import minimist from "minimist"
import chalk from "chalk"
import {
  findConfigFile,
  readJsonConfigFile,
  convertToObject,
} from "typescript"

import type { CompilerOptions } from "typescript"

const rootPath = process.cwd()
const TARGETS = [
  "es3",
  "es5",
  "es6",
  "commonjs",
  "UMD",
  "AMD",
  "System",
  "ESNext",
]

const { target, mod } = minimist<{
  target: string
  mod: string
}>(process.argv.slice(2))

function exit(code: number, message: string = "") {
  console.error(message)
  process.exit(code)
}

if (!TARGETS.includes(target.toLowerCase())) {
  exit(
    24,
    chalk.red(`> valid --target ${TARGETS.join(", ")}`)
  )
}

const command = "tsc"
const src = resolve(rootPath, mod, "src")

const [fileConfig, ..._ignoredFileconfigs] = [
  findConfigFile(resolve(rootPath, mod), fs.existsSync), // search local package root
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
  [`${src}/index.ts`, "--module", target],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  }
)

if (status !== 0) {
  exit(24, chalk.red("> build error"))
} else {
  console.log(chalk.green("> build success"))
}
