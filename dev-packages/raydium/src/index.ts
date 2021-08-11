import { CommandLineParser } from 'src/cmd';

/**
 * 执行
 */
new CommandLineParser()
  .parser()
  .execute()
  .then(() => {
    console.log('execute finished');
  });
