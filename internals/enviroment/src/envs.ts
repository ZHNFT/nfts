import * as fs from "fs"
import * as path from "path"

const tsconfigPath = path.resolve(
  __dirname,
  "tsconfig.json"
)

const packagePath = path.resolve(__dirname, "package.json")

const pkg = require(packagePath)

/**
 * check if project base on typescript
 * @type {[type]}
 */
export function shouldUseTypescript(): boolean {
  return fs.existsSync(tsconfigPath)
}

/**
 * check if project base on react
 * @type {[type]}
 */
export function shouldUseReact(): boolean {
  const {
    dependencies = {},
    devDependencies = {},
    peerDependencies = {},
  } = pkg

  return Object.keys({
    ...dependencies,
    ...devDependencies,
    ...peerDependencies,
  }).includes("react")
}
