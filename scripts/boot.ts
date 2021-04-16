import path from "path"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import chalk from "chalk"
import minimist from "minimist"

type PArgsProps = {
  packageName: string
  type: "internal" | "package"
}

const pargs = minimist<PArgsProps>(process.argv.slice(2))

if (!pargs.type || !pargs.packageName) {
  console.error(
    chalk.bold(
      chalk.red(
        `> --type option is missing or --packageName option is missing`
      )
    )
  )
  process.exit(24)
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
  const packagePath = path.join(
    pkgCreatePlace,
    pargs.packageName
  )

  mkdirSync(packagePath)

  writeFileSync(
    path.join(packagePath, "package.json"),
    JSON.stringify(
      {
        name: `@${pargs.type}s/${pargs.packageName}`,
        version: "0.0.0",
        description: "description",
        main: "lib/index.js",
        repository:
          "https://github.com/leiwenpeng0424/initializer.git",
        author: "ray",
        license: "MIT",
        private: false,
      },
      null,
      2
    ),
    {
      encoding: "utf-8",
    }
  )

  const tsconfig = path.join(packagePath, "tsconfig.json")

  writeFileSync(
    tsconfig,
    JSON.stringify(
      {
        extends: "../../tsconfig.json",
        compilerOptions: {
          outDir: "./lib",
        },
      },
      null,
      2
    ),
    {
      encoding: "utf-8",
    }
  )
  mkdirSync(path.resolve(packagePath, "src"))
  mkdirSync(path.resolve(packagePath, "tests"))
  writeFileSync(
    path.resolve(packagePath, "README.md"),
    "`DO NOT USE IT IN YOUR PRODUCTION, PERSONAL USAGE ONLY`"
  )
  // to be continue...
} else {
  console.info(
    chalk.bold(
      chalk.yellow(`unknow type value, ${pargs.type}`)
    )
  )
  process.exit(24)
}
