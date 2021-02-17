import { Prompt } from "@initializer/ask-core";

type State = {
  status: "idle" | "done" | string;
};

export default class InputPrompt extends Prompt<State, string> {
  state = {
    status: "idle",
  };
  onKeypress(): void {
    //
  }
  render(): string {
    const { status } = this.state;
    if (status === "idle") {
      return "render";
    }

    return "";
  }
}
