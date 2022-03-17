const { InteractiveQuery } = require('../dist/index');

const ask = new InteractiveQuery([
  {
    name: 'start',
    summary: 'Start your survey right now ?',
    type: 'confirm'
  },
  {
    name: 'age',
    summary: 'Input your age ?',
    type: 'input'
  },
  {
    name: 'favor',
    summary: 'Select your favorite package manager ?',
    type: 'select',
    alternatives: [
      {
        name: 'Pnpm',
        description: 'Pnpm Pnpm Pnpm Pnpm Pnpm'
      },
      {
        name: 'Npm',
        description: 'Npm Npm Npm Npm Npm'
      },
      {
        name: 'Yarn',
        description: 'Yarn Yarn Yarn Yarn Yarn'
      }
    ]
  },
  {
    name: 'password',
    summary: 'Input your password ?',
    type: 'password'
  }
]);

(async () => {
  const answers = await ask.prompt();
  console.log(answers);
})();
