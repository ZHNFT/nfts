import { useState, useKeypress, createPrompt } from "@initializer/ask-core";

// 1. 需要知道输入的值。
// 2. 对输入进行首字母校验，是否为**Y**开头，或者**n**开头。
// 3. 校验完成后调用done方法。
export default createPrompt<string>((config, done) => {
  const [input, setInput] = useState("");

  useKeypress((key, rl) => {
    if (rl.line) {
      setInput(rl.line);
    }

    if (key.name === "return") {
      done(input);
    }
  });

  return `comfirm ${config.message} Y/n`;
});
