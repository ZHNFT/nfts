import chalk from "chalk"
import minimist from "minimist"
import path from "path"

type PArgsProps = {
  packageName: string
  type: "internal" | "package"
}

const pargs = minimist<PArgsProps>(process.argv.slice(2))

if (!pargs.packageName) {
  console.error(
    chalk.bold(chalk.red(`Give me a name, please!!!`))
  )
  process.exit(2)
}

console.log(
  chalk.bold(
    chalk.cyan(
      `> start creating a new package template (${pargs.packageName})`
    )
  )
)

const packageCreatePlace = path.resolve(
  process.cwd(),
  pargs.type + "s"
)
