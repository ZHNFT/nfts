import { CommandLineTool } from '@ntfs/command-line';

export class Mono extends CommandLineTool {
  public constructor() {
    super({
      toolName: 'mono',
      toolDescription: 'this is a description'
    });
  }

  public prepare(): Mono {
    return this;
  }

  public run(): Promise<void> {
    return Promise.resolve();
  }
}
