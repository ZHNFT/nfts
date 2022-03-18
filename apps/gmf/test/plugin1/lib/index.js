const { Plugin } = require('../../../dist/core/PluginManager');

class InitPlugin extends Plugin {
  name = 'init';
  summary = 'init plugin test';

  apply = ctx => {
    ctx.hook.build.addHook('before', () => {
      console.log('init plugin invoke');
    });
  };
}

module.exports = new InitPlugin();
