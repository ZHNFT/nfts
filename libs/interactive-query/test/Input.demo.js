const { Input } = require('../dist/index');

const input = new Input({
  summary: 'Input your name ? '
});

input.execute().then(answer => {
  console.log('');
});
