interface CommandLineInfo {
  name: string;
  description: string;
}

export default class CommandLineTool {
  readonly #_name: string;
  readonly #_description: string;

  constructor({ name, description }: CommandLineInfo) {
    this.#_name = name;
    this.#_description = description;
  }

  get name(): string {
    return this.#_name;
  }

  get description(): string {
    return this.#_description;
  }
}
