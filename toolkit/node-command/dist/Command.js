export class ICommand {
}
export class Command {
    constructor({ commandName, commandDescription }) {
        this.commandName = commandName;
        this.commandDescription = commandDescription;
        this.commandActions = new Map();
    }
    getAction(actionName) {
        return this.commandActions.get(actionName);
    }
    addAction(action) {
        this.commandActions.set(action.actionName, action);
    }
    invokeAction() {
        //
    }
}
