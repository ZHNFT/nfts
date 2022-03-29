const Action = require('../../../dist/Action');
const CommandTool = require('../../../dist/CommandTool');

class Tool extends CommandTool {
  constructor() {
    super({
      toolName: 'xxx',
      toolDescription: 'xxxxxxxxxxxxx'
    });
  }
}

const command = new Tool();

class DevAction extends Action {
  constructor() {
    super({
      actionName: 'dev',
      actionDescription: 'devdevdevdevdev'
    });
  }

  onParameterDefinition() {
    this.parser.flagOption({ name: '--allowUnknown' });
  }
  onExecute() {
    console.log('dev execute');
  }
}

command.addAction(new DevAction());

command.parse(['dev']);
