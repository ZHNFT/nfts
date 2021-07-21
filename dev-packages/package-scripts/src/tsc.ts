import cp from 'child_process';
import * as process from 'process';

const child = cp.spawn('tsc', [], {
  shell: process.platform === 'win32'
});

child
  .on('message', (buf) => {
    console.log(buf.toString());
  })
  .on('exit', (code) => {
    console.log(`Exit with code ${code}`);
  });
