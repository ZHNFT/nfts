import { makePrompt, Config, HookCleaup } from "@initializer/ask-core";

export default makePrompt(function inputPrompt(
	config: Config,
	finish: HookCleaup
) {
	console.log("input-prompt");
});
