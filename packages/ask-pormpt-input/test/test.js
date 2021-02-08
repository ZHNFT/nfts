const inputPrompt = require("../dist");

inputPrompt
  .default({
    message: "Show me the money ?",
  })
  .then((ans) => {
    console.log(ans);
  });
