import CommandLineParser from './cmd/CommandLineParser';

new CommandLineParser()
  .parser()
  .execute()
  .then(() => {});
