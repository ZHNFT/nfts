import { createPrompt, useState, useKeypress } from "@initializer/ask-core";

export default createPrompt<string>(function input(option, done) {
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<string>("idle");

  useKeypress((key, rl) => {
    setValue(rl.line);
    if (key.name === "return") {
      setStatus("done");
      done(rl.line);
    }
  });

  if (status === "done") {
    return `${option.message} ${value}\n`;
  }
  return option.message;
});
