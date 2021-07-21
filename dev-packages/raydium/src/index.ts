import { CommandLineManager } from '@raydium/command-line-tool';

/// startup raydium process

const cmd = new CommandLineManager();

cmd
  .parser()
  .then(() => {})
  .catch((e) => {
    cmd.terminal.writeLine(e.message);
  });
