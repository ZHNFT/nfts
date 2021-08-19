import CommandLineTool from '../src/CommandLineTool';

describe('command line tool public methods test', () => {
  const cmd = new CommandLineTool({
    name: 'testing',
    description: 'testing CLT'
  });

  it('should return the correct parsed arguments object', () => {
    const args = [
      'a,',
      'b',
      'commandName1',
      'commandName2',
      '--arg1',
      '--arg2',
      'value2',
      '-arg3',
      'value3',
      'value3-3',
      '-arg4',
      '-arg5',
      'value5',
      'value6',
      'value7'
    ];

    cmd.parser(args);

    const options = cmd.commandLineOptions as {
      _: string[];
      arg1: boolean;
      arg2: string;
      arg3: string;
      arg4: boolean;
      arg5: string;
    };

    expect(options._.length).toBe(5);
    expect(options.arg1).toBe(true);
    expect(options.arg2).toBe('value2');
    expect(options.arg3).toBe('value3');
    expect(options.arg4).toBe(true);
    expect(options.arg5).toBe('value5');
  });
});
