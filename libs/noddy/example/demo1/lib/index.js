const { Action, CommandTool } = require('../../../dist');

class NameAction extends Action {
  constructor() {
    super({
      actionName: 'dev',
      actionDescription: 'development ...'
    });
  }

  /**
   * @implements
   */
  onParameterDefinition() {
    this.capitalParameter = this.addParameter({
      name: '--capital',
      usage: "This's a capital name",
      type: 'Flag'
    });

    this.ageParameter = this.addParameter({
      name: '--age',
      type: 'Int',
      usage: 'Your age'
    });

    this.nameParameter = this.addParameter({
      name: '--name',
      type: 'String',
      usage: 'Your name'
    });
  }
  /**
   * @implements
   */
  onExecute() {
    console.log('dev action onExecute!!!');
  }
}

class Demo1 extends CommandTool {
  constructor() {
    super({ toolName: 'demo', toolDescription: 'demo tool' });
    this.addAction(new NameAction());
  }
}

new Demo1()._exec().then(
  () => {
    console.log('finished');
  },
  e => {
    console.log(e);
  }
);
