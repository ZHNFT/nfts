import { Gmf } from './cli/Gmf';

new Gmf()
  .prepare()
  .execute()
  .then(() => {
    console.log('正常结束');
  })
  .catch((e: Error) => {
    console.log('异常结束');
  })
  .finally(() => {
    console.log('不管如何，代码都执行结束了');
  });
