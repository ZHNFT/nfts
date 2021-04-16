/**
 * 该脚本拥有两个命令行参数
 *   --scope=a,b,c,d,e,f,g
 *   --ignore=a,b,c,d,e,f,g
 */
import minimist from "minimist"
import glob from "glob"
import path from "path"
import buble from "@rollup/plugin-buble"
import ts from "rollup-plugin-typescript2"
import { workspaces } from "./package.json"

const { ignore, scope } = minimist(process.argv.slice(2), {
  default: {
    ignore: "",
    scope: "",
  },
})

const configs = []

function getWorkspaces(workspaces) {
  return workspaces.map((workspace) => {
    return glob.sync(workspace, {})
  })
}

function filterWorkspaces(workspaces, scope, ignore) {
  let allWorkspaces = getWorkspaces(workspaces)
  return allWorkspaces.flat().filter((workspace) => {
    const pkg = workspace.split("/")[1]
    console.log
    return scope.includes(pkg) && !ignore.includes(pkg)
  })
}

function main() {
  const packages = filterWorkspaces(
    workspaces,
    scope.split(","),
    ignore.split(",")
  )

  packages.forEach((pack) => {
    const config = {
      output: {},
      plugins: [],
    }
    config.input = path.resolve(
      process.cwd(),
      pack,
      "src/index.ts"
    )
    config.output.file = path.resolve(
      process.cwd(),
      pack,
      "lib/index.js"
    )
    // config.plugins.push(buble())
    config.plugins.push(
      ts({
        tsconfig: path.resolve(
          process.cwd(),
          pack,
          "tsconfig.json"
        ),
      })
    )

    configs.push(config)
  })

  console.log(configs)

  return configs
}

module.exports = main()
