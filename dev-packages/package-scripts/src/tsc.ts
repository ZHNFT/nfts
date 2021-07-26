import cp from 'child_process';
import * as process from 'process';

const child = cp.spawn('tsc', [], {
  shell: process.platform === 'win32'
});

child
  .on('message', (buf) => {
    console.log(buf.toString());
  })
  .on('exit', (code: number) => {
    if (code === 0) {
      console.log('Success with code 0');
    } else {
      console.error(`Error with code ${code}`);
    }
  });
