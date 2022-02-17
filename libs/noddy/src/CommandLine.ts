import { Command } from '@ntfs/argparser';

export abstract class CommandLine extends Command {
  constructor(name, description) {
    super(name, description);
  }
}
