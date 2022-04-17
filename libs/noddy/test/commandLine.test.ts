import { Command, CommandLine } from '../src';
import { StringParameter } from '@nfts/argparser';

const fn = jest.fn();

class Reader extends Command {
  constructor() {
    super({
      commandName: 'reader',
      commandDescription: 'reader reader reader reader'
    });
  }

  onDefineParameters(): void {
    this.subParser.addParam(
      new StringParameter({
        name: '--aa',
        shortName: '-a',
        summary: 'aaaaaaaa'
      })
    );
  }

  async onExecute(args?: unknown): Promise<void> {
    const op = async () => {
      fn();
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    };

    await op();
  }
}

class Tool extends CommandLine {
  constructor() {
    super({
      toolName: 'xxx',
      toolDescription: 'xxx xxx xxx'
    });

    this.addCommand(new Reader());
  }
}

describe('Command Tool Test Case', function () {
  test('should exec without error', async () => {
    return new Tool().execute().then(() => {
      expect(fn).toBeCalled();
    });
  });
});
