export class BaseSubCommand {
    constructor({ subCommandName, subCommandDescription, parser }) {
        this.subCommandName = subCommandName;
        this.subCommandDescription = subCommandDescription;
        this.parser = parser;
        this.onParametersDefine(parser);
    }
}
