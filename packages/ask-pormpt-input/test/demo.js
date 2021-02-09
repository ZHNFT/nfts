const inputPrompt = require("../dist");

inputPrompt
	.default({
		message: "Who are you ?",
	})
	.then((ans) => {
		console.log("answer ->", ans);
	});
