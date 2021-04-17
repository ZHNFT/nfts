import * as fs from "fs"
import * as path from "path"

const tsconfigPath = path.resolve(
  process.cwd(),
  "tsconfig.json"
)

const packagePath = path.resolve(
  process.cwd(),
  "package.json"
)

const pkg = require(packagePath)

/**
 * @method shouldUseTypescript
 *
 * @return {boolean}
 * @public
 */
export function shouldUseTypescript(): boolean {
  return fs.existsSync(tsconfigPath)
}

/**
 * @method shouldUseReact
 *
 * @return {boolean}
 * @public
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

/**
 * @method isDevelopment
 *
 * @return {boolean}
 * @public
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}
