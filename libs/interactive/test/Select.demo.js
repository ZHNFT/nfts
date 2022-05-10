const { Select } = require('../dist');

const select = new Select({
  summary: '选择一个选择一个选择一个选择一个选择一个选择一个？',
  alternatives: [
    { name: 'Pnpm', description: 'pnpm package manager' },
    { name: 'Npm', description: 'npm package manager' },
    { name: 'Yarn', description: 'yarn package manager' }
  ]
});

select.execute().then(answer => {
  console.log('');
});
