import chalk from "chalk";
import { useState, useKeypress, createPrompt } from "@initializer/ask-core";

// 1. 需要知道输入的值。
// 2. 对输入进行首字母校验，是否为**Y**开头，或者**n**开头。
// 3. 校验完成后调用done方法。
export default createPrompt<string>((config, done) => {
  const [input, setInput] = useState("");
  const [isDone, seIsDone] = useState(false);

  let isYes = false;

  if (isDone) {
    isYes = input.trim().startsWith("Y");
  }

  useKeypress((key, rl) => {
    if (rl.line) {
      setInput(rl.line);
    }

    if (key.name === "return") {
      done(isYes);
      seIsDone(true);
    }
  });

  const formatValue = input.trim();

  return `comfirm ${config.message} ${
    // eslint-disable-next-line no-nested-ternary
    isDone
      ? isYes
        ? chalk.green("Yes")
        : chalk.green("Yes")
      : `Y/n ${chalk.blue(formatValue)}`
  }`;
});
