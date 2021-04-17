/**
 * 该脚本拥有两个命令行参数
 *   --scope=a,b,c,d,e,f,g
 *   --ignore=a,b,c,d,e,f,g
 */
import minimist from "minimist"
import glob from "glob"
import path from "path"
import buble from "@rollup/plugin-buble"
import eslint from "@rollup/plugin-eslint"
import strip from "@rollup/plugin-strip"
import nodeResolve from "@rollup/plugin-node-resolve"
import yaml from "@rollup/plugin-yaml"
import { terser } from "rollup-plugin-terser"
import ts from "rollup-plugin-typescript2"
import {
  isDevelopment,
  resolveByBasepath,
} from "@rays/enviroment"
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
    const plugins = [
      ts({
        tsconfig: path.resolve(
          process.cwd(),
          pack,
          "tsconfig.json"
        ),
        verbosity: 3,
        clean: true,
        check: true,
        typescript: require("typescript"),
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: { module: "ESNext" },
        },
      }),
      buble({ objectAssign: true }),
      nodeResolve({}),
      eslint({}),
      yaml(),
    ]

    if (isDevelopment()) {
      plugins.push(terser())
    } else {
      plugins.push(strip())
    }

    const config = {
      input: resolveByBasepath(pack, "src/index.ts"),
      output: {
        file: resolveByBasepath(pack, "lib/index.js"),
        format: "cjs",
      },
      plugins,
    }

    configs.push(config)
  })

  console.log(configs)

  return configs
}

export default main()
