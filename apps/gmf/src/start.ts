import { CommandLineParser } from './cmd/CommandLineParser';

new CommandLineParser()
  .prepare()
  .exec()
  .then(() => {
    //
  })
  .catch(() => {
    //
  });
