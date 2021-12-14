import { Command, ICommandAction, LifeCycle } from '@nfts/node-command';

class BuildLifeCycle implements LifeCycle {
  before() {
    console.log('execute before');
  }

  after() {
    console.log('execute after');
  }
}

export class Build extends Command<unknown> {
  constructor() {
    super({
      commandDescription: 'build command',
      commandName: 'build'
    });

    this.commandName = 'dev';
    this.commandActions = new Map<string, ICommandAction<unknown>>();
  }
}
