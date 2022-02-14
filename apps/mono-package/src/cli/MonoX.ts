import { CommandLineTool } from '@ntfs/command-line';

export class MonoX extends CommandLineTool {
  public constructor() {
    super({
      toolName: 'monox',
      toolDescription: 'this is a monox description'
    });
  }

  public run(): Promise<void> {
    return Promise.resolve();
  }
}
