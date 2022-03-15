const { Confirm } = require('../dist/index');

const confirm = new Confirm({
  summary: 'Should I quit my Job now ? '
});

confirm.execute().then(answer => {
  console.log('');
});
