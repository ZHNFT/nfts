import cli_args from '../src';

describe('test args function', () => {
  test('test with no args', () => {
    const parsedArgs = cli_args([
      'command',
      '-a',
      'b',
      '--c',
      'c',
      '--d',
      '-e',
      'f'
    ]);

    expect(parsedArgs._).toEqual('command');
    expect(parsedArgs.a).toEqual('b');
    expect(parsedArgs.c).toEqual('c');
    expect(parsedArgs.d).toEqual(true);
    expect(parsedArgs.e).toEqual('f');
  });

  test('test with error args', () => {
    const parsedArgs = cli_args([
      'commandName',
      '--clean',
      '--dist',
      './build',
      '---runDry'
    ]);
    expect(parsedArgs._).toEqual('commandName');
    expect(parsedArgs.clean).toEqual(true);
    expect(parsedArgs.runDry).toBeUndefined();
  });
});
