export class CommandLine {
  private readonly toolName: string;
  private readonly toolDescription: string;

  constructor({
    toolName,
    toolDescription
  }: {
    toolName: string;
    toolDescription: string;
  }) {
    this.toolName = toolName;
    this.toolDescription = toolDescription;
  }
}
