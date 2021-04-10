const {
  shouldUseTypescript,
  shouldUseReact,
} = require("@internal/enviroment")

const usingRect = shouldUseReact()
const usingTs = shouldUseTypescript()

const extendRuleSets = ["eslint:recommended"].concat(
  usingTs
    ? [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ]
    : usingRect
    ? [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
      ]
    : []
)

const config = {
  extends: extendRuleSets,
  plugins: [],
}

// @todo 是否在使用babel的环境下使用@babel/eslint-parser作为eslint的解析器使用
if (usingTs) {
  config.parser = "@typescript-eslint/parser"
  config.plugins.push("@typescript-eslint/eslint-plugin")
}

if (usingRect) {
  config.plugins.push("react")
  config.settings = {
    react: {
      version: "detect",
    },
  }
}

module.exports = config
