export class BaseSubCommand {
    constructor({ subCommandName, subCommandDescription, parser }) {
        this.subCommandName = subCommandName;
        this.subCommandDescription = subCommandDescription;
        this.onParametersDefine(parser);
    }
}
