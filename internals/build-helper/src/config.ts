import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import eslint from "@rollup/plugin-eslint";

import { formatMessage } from "./eslintFormatter";

import type { RollupOptions } from "rollup";

const root = process.cwd();

// 抽出一些需要额外指定的部分
interface ConfigProps {
  input: string;
  output: RollupOptions["output"];
  apiExtractor: boolean;
}

// Produce rollup options
export default function config({
  output,
  input,
  apiExtractor,
}: ConfigProps): RollupOptions {
  // Make sure input is valid
  if (!fs.existsSync(path.resolve(root, input))) {
    console.error(chalk.bgRed(chalk.white(`${input} 文件不存在！`)));
    process.exit(2);
  }

  const plugins = [];

  if (apiExtractor) {
    plugins.push(/* TODO 这里放api-extractor插件 */);
  }

  return {
    input,
    output,
    plugins: [
      babel(),
      commonjs({}),
      nodeResolve({}),
      eslint({
        fix: true,
        include: "*.ts",
        // @ts-ignore FIXME
        formatter: formatMessage,
      }),
    ],
  };
}
