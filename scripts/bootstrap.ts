/**
 * create new package
 */
import { mkdirSync, writeFileSync } from "fs"
import path from "path"
import inquirer from "inquirer"
import chalk from "chalk"

/**
 * @example pnpm bootstrap
 */

const rootPath = process.cwd()
const workspaces = ["internals", "packages"]

void inquirer
  .prompt<{ type: "internals" | "packages"; name: string }>([
    {
      name: "type",
      type: "list",
      message: "<- choose position  ->",
      choices: workspaces,
    },
    {
      name: "name",
      type: "input",
      message: "<-   package name   ->",
    },
  ])
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
          repository: "https://github.com/leiwenpeng0424/initializer.git",
          author: "ray",
          license: "MIT",
          private: false,
          devDependencies: {
            "@rays/eslint-config": "workspace:*",
          },
          eslintConfig: {
            root: true,
            extends: ["@rays/eslint-config"],
          },
          eslintIgnore: ["dist", "tests", "lib"],
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
            outDir: "lib",
            declaration: true,
            declarationDir: "lib",
          },
          exclude: ["lib/**/*", "tests/**/*"],
        },
        null,
        2
      ),
      {
        encoding: "utf-8",
      }
    )
    mkdirSync(path.resolve(packagePath, "src"))
    writeFileSync(path.resolve(packagePath, "src", "index.ts"), "")
    mkdirSync(path.resolve(packagePath, "tests"))
    writeFileSync(
      path.resolve(packagePath, "tests", `${name}.test.ts`),
      'describe("initial testing", () => {\r' +
        '  it("equals to 3", () => {\r' +
        "    expect(1+2).toEqual(3)\r" +
        "  })\r" +
        "})\r"
    )
    writeFileSync(
      path.resolve(packagePath, "README.md"),
      "--- \r" +
        "`DO NOT USE IT IN YOUR PRODUCTION, PERSONAL USAGE ONLY`\r" +
        "---\r"
    )
    writeFileSync(
      path.resolve(packagePath, "api-extractor.json"),
      JSON.stringify(
        {
          $schema:
            "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
          mainEntryPointFilePath: "<projectFolder>/lib/index.d.ts",
          extends: "../../api-extractor.json",
        },
        null,
        2
      )
    )

    const { bgBlack, white, blue } = chalk
    console.log("")
    console.log(
      `----${bgBlack(white("Template files generated"))} (${name})----`
    )
    console.log("")
    console.log(`-|-${blue("src")}`)
    console.log("-|---index.ts")
    console.log(`-|-${blue("tests")}`)
    console.log(`-|---${name}.test.ts`)
    console.log("-|-api-extractor.json")
    console.log("-|-README.md")
    console.log("-|-tsconfig.json")
    console.log("")
  })
