import fs from "fs"
import path from "path"

export type IObject<T> = { [key: string]: T }

export type PackageJSONSchema = {
  dependencies: IObject<string>
  devDependencies: IObject<string>
  peerDependencies: IObject<string>
}

const tsconfigPath: string = path.resolve(process.cwd(), "tsconfig.json")

const packagePath: string = path.resolve(process.cwd(), "package.json")

const pkg: PackageJSONSchema = JSON.parse(
  fs.readFileSync(packagePath).toString()
) as PackageJSONSchema

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
  const { dependencies = {}, devDependencies = {}, peerDependencies = {} } = pkg

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
