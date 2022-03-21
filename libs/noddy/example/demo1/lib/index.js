const { Action, CommandTool } = require('../../../dist');

class NameAction extends Action {
  ageParameter;
  nameParameter;
  capitalParameter;

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
    console.log(this.capitalParameter);
    console.log(this.ageParameter);
    console.log(this.nameParameter);
  }
}

class Demo1 extends CommandTool {
  constructor() {
    super({ toolName: 'demo', toolDescription: 'demo tool' });
    this.addAction(new NameAction());
  }
}

new Demo1().exec().then(
  () => {
    console.log('finished');
  },
  e => {
    console.log(e);
  }
);
