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
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import ts from "rollup-plugin-typescript2"
import apiExtractor from "@rays/rollup-plugin-api-extractor"
import { workspaces } from "./package.json"

const isDevelopment = process.env.NODE_ENV === "development"

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
  return allWorkspaces
    .flat()
    .filter((workspace) => {
      const pkg = workspace.split("/")[1]
      return scope.includes(pkg) && !ignore.includes(pkg)
    })
    .map((filterdPackage) => {
      try {
        const pkgJSON = require(path.resolve(
          process.cwd(),
          filterdPackage,
          "package.json"
        ))

        return {
          package: filterdPackage,
          rawJSON: pkgJSON,
        }
      } catch (e) {
        console.error(e)
        process.exit(24)
      }
    })
}

function main() {
  const packages = filterWorkspaces(
    workspaces,
    scope.split(","),
    ignore.split(",")
  )

  packages.forEach(
    ({ package: pack, rawJSON: { dependencies, peerDependencies } }) => {
      const packageBasePath = path.resolve(process.cwd(), pack)

      const plugins = [
        ts({
          tsconfig: path.resolve(packageBasePath, "tsconfig.json"),
          verbosity: 2,
          clean: true,
          check: true,
          useTsconfigDeclarationDir: true,
          tsconfigOverride: {
            compilerOptions: {
              module: "ESNext",
              sourceMap: isDevelopment,
            },
          },
        }),
        buble({ objectAssign: true }),
        commonjs(),
        eslint({
          fix: !isDevelopment,
          cache: true,
          cacheFile: path.resolve(packageBasePath, "temp/.eslintcache"),
          include: "src/",
          exclude: ["lib/", "dist/", "node_modules/"],
          cwd: packageBasePath,
        }),
      ]

      if (!isDevelopment) {
        // plugins.push(terser())
        plugins.push(strip())
        plugins.push(
          apiExtractor({
            configFile: path.resolve(pack, "api-extractor.json"),
            clear: true,
            invokeOptions: {
              localBuild: isDevelopment,
              showVerboseMessages: isDevelopment,
            },
            generatedDist: path.resolve(packageBasePath, `lib`),
          })
        )
      }

      const config = {
        input: path.resolve(pack, "src/index.ts"),
        external: Object.keys({
          ...dependencies,
          ...peerDependencies,
        }),
        output: {
          file: path.resolve(pack, "lib/index.js"),
          format: "cjs",
          exports: "auto",
        },
        plugins,
      }

      configs.push(config)
    }
  )

  return configs
}

export default main()
