import path from "path"
import { writeFileSync, existsSync, readFileSync } from "fs"
import chalk from "chalk"
import minimist from "minimist"

type PArgsProps = {
  packageName: string
  type: "internal" | "package"
}

const pargs = minimist<PArgsProps>(process.argv.slice(2))

if (!pargs.packageName) {
  console.error(
    chalk.bold(chalk.red(`请指定名称，以初始化模版文件`))
  )
  process.exitCode = 2
}

console.log(
  chalk.bold(
    chalk.cyan(
      `> start creating a new package template (${pargs.packageName})`
    )
  )
)

const pkgCreatePlace = path.resolve(
  process.cwd(),
  pargs.type + "s"
)

if (existsSync(pkgCreatePlace)) {
  writeFileSync(
    path.join(pkgCreatePlace, "package.json"),
    "",
    {
      encoding: "utf-8",
    }
  )
} else {
  console.info(
    chalk.bold(
      chalk.yellow(
        "only support type `internal` or `package`"
      )
    )
  )
  process.exitCode = 2
}
