import chalk from "chalk"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import path from "path"
import inquirer from "inquirer"

/**
 * @example pnpm bootstrap
 */

const rootPath = process.cwd()
const workspaces = ["internals", "packages"]

inquirer
  .prompt<{ type: "internals" | "packages"; name: string }>(
    [
      {
        name: "type",
        type: "list",
        message: "<- choose position ->",
        choices: workspaces,
      },
      {
        name: "name",
        type: "input",
        message: "<- package name ->",
      },
    ]
  )
  .then(({ type, name }) => {
    const pkgCreatePlace = path.resolve(rootPath, type)
    const packagePath = path.join(pkgCreatePlace, name)
    mkdirSync(packagePath)
    writeFileSync(
      path.join(packagePath, "package.json"),
      JSON.stringify(
        {
          name: `@rays/${name}`,
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
      { encoding: "utf-8" }
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
      `---

\`DO NOT USE IT IN YOUR PRODUCTION, PERSONAL USAGE ONLY\`

---
`
    )
  })
