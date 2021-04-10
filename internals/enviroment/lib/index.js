const fs = require("fs")
const path = require("path")

module.exports = exports

const tsconfigPath = path.resolve(
  __dirname,
  "tsconfig.json"
)

const pkg = path.resolve(__dirname, "package.json")

exports.shouldUseTypescript = () => {
  return fs.existsSync(tsconfigPath)
}

exports.shouldUseReact = () => {
  const {
    dependencies,
    devDependencies,
    peerDependencies,
  } = pkg

  return Object.keys({
    ...dependencies,
    ...devDependencies,
    ...peerDependencies,
  }).includes("react")
}
