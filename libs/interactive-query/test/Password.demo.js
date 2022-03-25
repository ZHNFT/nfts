const { Password } = require('../dist/index');

const password = new Password({
  summary: 'Input your password ? '
  // mask: '-'
});

password.execute().then(answer => {
  console.log('');
});
