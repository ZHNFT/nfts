import {
  shouldUseTypescript,
  shouldUseReact,
} from "@rays/enviroment"

import type { Linter } from "eslint"

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

const config: Linter.BaseConfig = {
  extends: extendRuleSets,
}

config.plugins = []

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

export default config
