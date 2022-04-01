const { Plugin } = require('@nfts/gmf');

class InitPlugin extends Plugin {
  name = 'init';
  summary = 'init plugin test';

  async apply(ctx) {
    await new Promise(resolve => {
      setTimeout(() => {
        ctx.hook.build.addHook('pre', async args => {
          const asyncFn = async () => {
            await new Promise(resolve1 => {
              setTimeout(() => {
                console.log(args);
                console.log('init plugin invoke');
                resolve1();
              }, 5000);
            });
          };

          await asyncFn();
        });

        resolve();
      }, 5000);
    });
  }
}

module.exports = new InitPlugin();
