import { resolve } from "path"
import { spawnSync } from "child_process"
import minimist from "minimist"
import chalk from "chalk"

const rootPath = process.cwd()
const TARGETS = ["es3", "es5", "es6", "commonjs"]

const { target, mod } = minimist<{
  target: string
  mod: string
}>(process.argv.slice(2))

function exit(code: number, message: string = "") {
  console.error(message)
  process.exit(code)
}

if (!mod || !target) {
  exit(24, chalk.red(`> --mode or --target option missing`))
}

if (!TARGETS.includes(target.toLowerCase())) {
  exit(
    24,
    chalk.red(`> valid --target ${TARGETS.join(", ")}`)
  )
}

const command = "tsc"
const src = resolve(rootPath, mod, "src")
const dist = resolve(rootPath, mod, "lib")
// @todo read from project root
const projectConfig = resolve(
  process.cwd(),
  "tsconfig.json"
)

const { status } = spawnSync(
  command,
  [
    `${src}/index.ts`,
    "--target",
    "esnext",
    "--outDir",
    dist,
    "--allowSyntheticDefaultImports",
    "--module",
    target,
  ],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  }
)

if (status !== 0) {
  console.log(chalk.red("> build error"))
  process.exit(status as number)
} else {
  console.log(chalk.green("> build success"))
}
