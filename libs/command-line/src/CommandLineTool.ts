import { CommandLine } from './CommandLine';

export class CommandLineTool extends CommandLine {
  constructor(toolInfo: { toolName: string; toolDescription: string }) {
    super(toolInfo);
  }
}
